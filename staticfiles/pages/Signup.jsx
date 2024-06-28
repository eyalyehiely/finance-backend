
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../src/functions/axiosConfig'
import swal from 'sweetalert';
import AuthImage from '../images/finance.avif';
import AuthDecoration from '../images/auth-decoration.png';
import Button from 'react-bootstrap/Button';
import Rights from '../components/Rights';
import getAdress from '../functions/users/getAdress';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: 'male',
    life_status: 'single',
    num_of_children: 0,
    email: '',
    password: '',
    birth_date: '',
    profession: '',
    phone_number: '',
    address: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [addressResults, setAddressResults] = useState([]);

  const { first_name, last_name, gender, life_status, num_of_children, email, password, birth_date, profession, phone_number, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
      getAdress(setAddressResults);
    }
  , []);

  //const [filteredDebts, setFilteredDebts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  //  useEffect(() => {
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     setFilteredDebts(
  //       debts.filter((debt) =>
  //         debt.name.toLowerCase().includes(query) ||
  //         debt.type.toLowerCase().includes(query) ||
  //         debt.amount.toString().includes(query) ||
  //         new Date(debt.starting_date).toLocaleString().includes(query)||
  //         new Date(debt.finish_date).toLocaleString().includes(query)
  //       )
  //     );
  //   } else {
  //     setFilteredDebts(debts);
  //   }
  // }, [searchQuery, debts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/auth/signup/', formData)
      .then((response) => {
        console.log(response.data);
        swal({
          title: "משתמש נוסף בהצלחה",
          icon: "success",
          button: "אישור",
        }).then(() => {
          window.location.href = '/signin';
        });
      }).catch((error) => {
        console.error(error);
        swal({
          title: "שגיאה",
          icon: "warning",
          button: "אישור",
        });
      });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, life_status: e.target.value, num_of_children: '' }); // Reset num_of_children when life_status changes
  };

  const isMarriage = () => {
    if (life_status === 'marriage') {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">מספר ילדים<span className="text-rose-500">*</span></label>
          <select id="num_of_children" className="form-select w-full" value={num_of_children} onChange={handleChange}>
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            {/* Add more options as needed */}
          </select>
        </div>
      );
    }
  };

  return (
    <main className="bg-white dark:bg-slate-900" dir="rtl">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                      <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                      <stop stopColor="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                      <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                      <stop stopColor="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5" />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)" />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)" />
                </svg>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">צור חשבון ✨</h1>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="first_name">שם פרטי<span className="text-rose-500">*</span></label>
                    <input id="first_name" className="form-input w-full" type="text" value={first_name} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="last_name">שם משפחה <span className="text-rose-500">*</span></label>
                    <input id="last_name" className="form-input w-full" type="text" value={last_name} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="gender"> מגדר <span className="text-rose-500">*</span></label>
                    <select id="gender" className="form-select w-full" value={gender} onChange={handleChange} required>
                      <option value="male">זכר</option>
                      <option value="female">נקבה</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="life_status">סטטוס <span className="text-rose-500">*</span></label>
                    <select id="life_status" className="form-select w-full" value={life_status} onChange={handleStatusChange} required>
                      <option value="single">רווק/ה</option>
                      <option value="marriage">נשוי/ה</option>
                      <option value="divorce">גרוש/ה</option>
                    </select>
                  </div>

                  {isMarriage()}

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">כתובת מייל <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" value={email} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">סיסמה <span className="text-rose-500">*</span></label>
                    <input id="password" className="form-input w-full" type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange} required />
                    <div className="mt-2">
                      <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                      <label htmlFor="showPassword" className="text-sm font-medium mb-1"> הצג סיסמה  </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="birth_date">תאריך לידה <span className="text-rose-500">*</span></label>
                    <input id="birth_date" className="form-input w-full" type="date" value={birth_date} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="profession">מקצוע <span className="text-rose-500">*</span></label>
                    <input id="profession" className="form-input w-full" type="text" value={profession} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone_number">מספר טלפון <span className="text-rose-500">*</span></label>
                    <input id="phone_number" className="form-input w-full" type='tel' value={phone_number} onChange={handleChange} required minLength={10} maxLength={10} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">עיר מגורים <span className="text-rose-500">*</span></label>
                    <select id="address" className="form-select w-full" value={formData.address} onChange={handleChange} required>
                      <option value="">בחר עיר</option>
                      {addressResults.map((address, index) => (
                        <option key={index} value={address['שם_ישוב']}>{address['שם_ישוב']}</option>
                      ))}
                    </select>
                  </div> 
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button type="submit" variant="primary">הרשם כאן</Button>
                </div>
              </form>

              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  יש לך כבר חשבון? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signin">התחברות</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 right-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

      <Rights />

    </main>
  );
}

export default Signup;
