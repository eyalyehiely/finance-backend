import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import {
  NavLink,
} from 'react-router-dom';

function AddCreditCard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('no');
  const [creditCards, setCreditCards] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  
  function fetchData() {
    const name = document.getElementById('name').value;
    const day_of_charge = document.getElementById('day_of_charge').value;
    const credit_type = document.getElementById('credit_type').value;
    const line_of_credit = document.getElementById('line_of_credit').value;
    const last_four_digits = document.getElementById('last_four_digits').value;
    const status = document.getElementById('status').value;

  
    axios.post('http://localhost:8000/api/add_credit_card/', {
      name: name,
      day_of_charge: day_of_charge,
      credit_type: credit_type,
      line_of_credit: line_of_credit,
      last_four_digits: last_four_digits,
      status: status,
    }, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response.data);
      swal({
        title: "💳כרטיס נוסף בהצלחה!",
        icon: "success",
        button: "אישור",
      }).then(() => {
        window.location.href = '/creditcards/all-cards';
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        swal({
          title: "שגיאה במערכת!",
          text: error.response.data.message || 'שגיאת שרת',
          icon: "warning",
          button: "אישור",
        });
      } else {
        console.error('No response from server:', error.request);
        swal({
          title: "שגיאה במערכת!",
          text: "אין תגובה מהשרת",
          icon: "warning",
          button: "אישור",
        });
      }
    });
  }
  
  // function validateCardLength(){
  //   const last_four_digits = document.getElementById('last_four_digits').value|| '';
  //   if (last_four_digits.length !==4){
  //     swal({
  //       title: "שגיאה !",
  //       text: "חייב להכניס 4 ספרות ",
  //       icon: "warning",
  //       button: "אישור",
  //     });
  //     return false
  //   }
  //   return true
  // }

  function getCreditData() {
    axios.post('http://localhost:8000/api/get_credit_card/', {},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.data.status === 200) {
          setCreditCards(response.data.credit_cards);
        } else {
          console.log('Error:', response.data.message);
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('An error occurred while fetching data.');
      });
  }

  useEffect(() => {
    getCreditData();
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData()
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">הוסף כרטיס </h1>
            </div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <NavLink
                    end
                    to="/creditcards/all-cards"
                    className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                    }
                    
                  >
                    <span className="hidden xs:block ml-2 text-white">חזור 
                      {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg> */}
                    </span>
                  </NavLink>
              </button>
            <div className="border-t border-slate-200 dark:border-slate-700">
              {/* Components */}
              <form action="AddCreditCard" method="post" onSubmit={handleSubmit}>
                <div className="space-y-8 mt-8">
                  {/* Input Types */}
                  <div>
                    <div className="grid gap-5 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">שם הכרטיס<span className="text-rose-500">*</span></label>
                        
                        <select id='name' name='name' className="form-input w-full" required>
                           <option value=""></option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="American Express">American Express</option>
                            <option value="Diners">Diners</option>
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium mb-1" htmlFor="day_of_charge"> יום חיוב<span className="text-rose-500">*</span></label>
                        </div>
                        <select id='day_of_charge' name='day_of_charge' className="form-input w-full" required>
                           <option value=""></option>
                            <option value="2">2</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                           
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="credit_type">סוג הכרטיס<span className="text-rose-500">*</span></label>
                        <select id='credit_type' name='credit_type' className="form-input w-full" required>
                           <option value=""></option>
                            <option value="Debit">Debit</option>
                            <option value="Credit">Credit</option>

                           
                        </select>

                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="line_of_credit">מסגרת אשראי<span className="text-rose-500">*</span></label>
                        <div className="relative">
                        <input id='line_of_credit' name='line_of_credit' className="form-input w-full" type ="number" required placeholder='₪'></input>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="last_four_digits">4 ספרות אחרונות<span className="text-rose-500">*</span></label>
                        <div className="relative">
                        <input id='last_four_digits' name='last_four_digits' className="form-input w-full"  type="text" required maxLength={4}></input>
                        </div>
                      </div>
                      {/* {validateCardLength} */}

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="status">סטטוס<span className="text-rose-500">*</span></label>
                        <select id='status' name='status' className="form-input w-full" required>
                           <option value=""></option>
                            <option value="Active">פעיל</option>
                            <option value="Blocked">מושבת</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-blue" type="submit">הוסף !</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Rights/>
    </div>
  );
}

export default AddCreditCard;


