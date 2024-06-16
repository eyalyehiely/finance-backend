import React, {useState,} from 'react';
import { Link,useNavigate, } from 'react-router-dom';
import AuthImage from '../images/finance.avif';
import AuthDecoration from '../images/auth-decoration.png';
import axios from "axios";
import GetAdress from './component/GetAdress';
import Rights from '/src/components/Rights';


function Signup() {
  const [status, setStatus] = useState('single')
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  // const [familyOptions, setFamilyOptions] = useState([]);
  // useEffect(() => {
  //    axios.post('http://localhost:8000/api/get_family/').then((response) => {
  //           setFamilyOptions(response.data);
  //         }).catch((err) => {
  //           console.log('err', err)
  //         });
  // }, []);
  function is_marriage() {
    if (status === 'marriage') {
      return (
          <div>
            {/* family_status */}
            <label className="block text-sm font-medium mb-1" htmlFor="life_status">
              משפחה <span className="text-rose-500">*</span>
            </label>
            <div> {/* first name */}
              <label className="block text-sm font-medium mb-1" id="family_name">שם המשפחה<span
                  className="text-rose-500">*</span></label>
              <input id="family_name" className="form-input w-full" type="text" required/>
            </div>
          </div>
      );
    }
  }
      GetAdress()
    function is_business() {
      if (isBusinessOwner) {
        return (
            <div>
              <div> {/* business name */}
                <label className="block text-sm font-medium mb-1" id="business_name">שם העסק<span
                    className="text-rose-500">*</span></label>
                <input id="business_name" className="form-input w-full" type="text" required/>
              </div>
            </div>
        );

    }
  }




    function fetchData() {
      const first_name = document.getElementById('first_name').value
      const last_name = document.getElementById('last_name').value
      const gender = document.getElementById('gender').value
      const life_status = document.getElementById('life_status').value
      const email = document.getElementById('email').value
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const birth_date = document.getElementById('birth_date').value;
      const profession = document.getElementById('profession').value
      const phone_number = document.getElementById('phone_number').value
      const address = document.getElementById('address').value

      axios.post('http://localhost:8000/api/signup/', {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        life_status: life_status,
        email: email,
        username: username,
        password: password,
        birth_date: birth_date,
        profession: profession,
        phone_number: phone_number,
        address: address,
      }).then((response) => {
        console.log(response.data);
        swal({
          title: "משתמש נוסף בהצלחה",
          icon: "success",
          button: "אישור",
        }).then(()=>{
          location.href='/signin'
        })
      }).catch((response) => {
        console.log(response.data);
        alert('Error, please try again')
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchData();
    };

    return (
        <main className="bg-white dark:bg-slate-900" dir="rtl" >

          <div className="relative md:flex">

            {/* Content */}
            <div className="md:w-1/2 ">
              <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

                {/* Header */}
                <div className="flex-1">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    {/*<button className="block" type='button'>*/}
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <defs>
                        <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                          <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%"/>
                          <stop stopColor="#A5B4FC" offset="100%"/>
                        </linearGradient>
                        <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                          <stop stopColor="#38BDF8" stopOpacity="0" offset="0%"/>
                          <stop stopColor="#38BDF8" offset="100%"/>
                        </linearGradient>
                      </defs>
                      <rect fill="#6366F1" width="32" height="32" rx="16"/>
                      <path
                          d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                          fill="#4F46E5"/>
                      <path
                          d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                          fill="url(#logo-a)"/>
                      <path
                          d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                          fill="url(#logo-b)"/>
                    </svg>
                    {/*</button>*/}
                  </div>
                </div>

                <div className="max-w-sm mx-auto w-full px-4 py-8">
                  <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">צור חשבון ✨</h1>
                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">

                      <div> {/* first name */}
                        <label className="block text-sm font-medium mb-1" id="first_name">שם פרטי<span
                            className="text-rose-500">*</span></label>
                        <input id="first_name" className="form-input w-full" type="text" required/>
                      </div>

                      <div>{/* last  name */}
                        <label className="block text-sm font-medium mb-1" htmlFor="last_name">שם משפחה <span
                            className="text-rose-500">*</span></label>
                        <input id="last_name" className="form-input w-full" type="text" required/>
                      </div>


                      <div>{/* gender */}
                        <label className="block text-sm font-medium mb-1" htmlFor="last_name"> מגדר <span
                            className="text-rose-500">*</span></label>
                        <select id='gender' className='user-select-all' required>
                          <option value="male">זכר</option>
                          <option value="female">נקבה</option>
                          <option value="other">אחר</option>
                        </select>


                      </div>
                      <div>{/* life status */}
                        <label className="block text-sm font-medium mb-1" htmlFor="life_status">סטטוס <span
                            className="text-rose-500">*</span></label>
                        <select id='life_status' className='user-select-all' required
                                onChange={(e) => setStatus(e.target.value)}>
                          <option value="single">רווק/ה</option>
                          <option value="marriage">נשוי/ה</option>
                          <option value="divorce">גרוש/ה</option>
                        </select>

                      </div>

                      {is_marriage()}

                      <div>{/* email */}
                        <label className="block text-sm font-medium mb-1" htmlFor="email">כתובת מייל <span
                            className="text-rose-500">*</span></label>
                        <input id="email" className="form-input w-full" type="email" required/>
                      </div>

                      <div>{/* username */}
                        <label className="block text-sm font-medium mb-1" htmlFor="username">שם משתמש<span
                            className="text-rose-500">*</span></label>
                        <input id="username" className="form-input w-full" type="text" required/>
                      </div>

                      <div>{/* password */}
                        <label className="block text-sm font-medium mb-1" htmlFor="password">סיסמה <span
                            className="text-rose-500">*</span></label>
                        <input id="password" className="form-input w-full" type="password" required/>
                      </div>

                      <div>{/* date */}
                        <label className="block text-sm font-medium mb-1" htmlFor="birth_date">תאריך לידה <span
                            className="text-rose-500">*</span></label>
                        <input id="birth_date" className="form-input w-full" type="date" required/>
                      </div>

                      <div>{/* profession */}
                        <label className="block text-sm font-medium mb-1" htmlFor="role">מקצוע <span
                            className="text-rose-500">*</span></label>
                        <input id="profession" className="form-input w-full" type="text" required/>
                      </div>

                      <div> {/* phone number */}
                        <label className="block text-sm font-medium mb-1" htmlFor="role">מספר טלפון <span
                            className="text-rose-500">*</span></label>
                        <input id="phone_number" className="form-input w-full" type='text' required/>
                      </div>

                      <div> {/* address */}
                        <label className="block text-sm font-medium mb-1" htmlFor="role"> כתובת <span
                            className="text-rose-500">*</span></label>
                        <input id="address" className="form-input w-full" type='text' required/>
                      </div>

                      <div className="flex items-center mb-4"> {/* business */}
                        <input id="business"
                               className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                               type="checkbox" 
                               onChange={(e) => setIsBusinessOwner(e.target.value)}/>
                        <label className="ml-2 block text-sm font-medium text-gray-900" htmlFor="business">
                          האם בבעלותך עסק ? 
                        </label>
                      </div>

                      {is_business()}

                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <button type='submit'
                              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap">הרשם
                        כאן
                      </button>
                    </div>
                  </form>

                  {/* Footer */}
                  <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-sm">
                      יש ברשותך חשבון ? <Link
                        className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        to="/signin">להתחברות</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Image */}
            <div className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2" aria-hidden="true">
              <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024"
                   alt="Authentication"/>
              <img className="absolute top-1/4 right-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration}
                   width="218" height="224" alt="Authentication decoration"/>
            </div>

          </div>
<Rights/>
        </main>

    );


}
export default Signup;




