import React, { useState} from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import {
  NavLink,
} from 'react-router-dom';
import swal from 'sweetalert'

function AddSaving() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('no');
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  
  function fetchData() {
    const saving_type = document.getElementById('saving_type').value
    const interest = document.getElementById('interest').value
    const amount = document.getElementById('amount').value
    const starting_date = document.getElementById('starting_date').value;
    const finish_date = document.getElementById('finish_date').value;

   
  
    console.log(saving_type,
      interest,
      amount,
      starting_date,
      finish_date);

    axios.post('http://localhost:8000/api/add_saving/', {
      saving_type:saving_type,
      interest:interest,
      amount:amount,
      starting_date:starting_date,
      finish_date:finish_date,
    },{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      swal({
        title: "💰!עבודה טובה",
        text: " !חסכון נוסף בהצלחה",
        icon: "success",
        button: "אישור",
      }).then(()=>{
      window.location.href = '/incomes/all-savings'
      })
    }).catch((response) => {
      // console.log(response.data);
      swal({
        title: "Ⅹ!שגיאה ",
        text: {"!שגיאת BACKEND":response.data.message},
        icon: "warning",
        button: "אישור",
      })
    })
  }



  

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
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">הוסף חסכון </h1>
            </div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <NavLink
                    end
                    to="/incomes/all-savings"
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
              <form action="AddSaving" method="post" onSubmit={handleSubmit}>
                <div className="space-y-8 mt-8">
                  {/* Input Types */}
                  <div>
                    <div className="grid gap-5 md:grid-cols-3">
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium mb-1" htmlFor="saving_type">סוג החסכון<span className="text-rose-500">*</span></label>
                        </div>
                        <select id='saving_type' name='saving_type' className="form-input w-full" required
                            onChange={(e) => setStatus(e.target.value)}>
                           <option value=""></option>
                            <option value="health">בריאות</option>
                            <option value="business">עסקים</option>
                            <option value="regular">רגיל</option>
                            <option value="education">השכלה</option>
                            <option value="other">אחר</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="amount">סכום<span className="text-rose-500">*</span></label>
                        <input id="amount" name="amount" className="form-input w-full" type="number" required placeholder='₪' />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="interest">ריבית<span className="text-rose-500">*</span></label>
                        <input id="interest" name="interest" className="form-input w-full" type="number" required placeholder='₪' />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="starting_date">תאריך התחלה<span className="text-rose-500">*</span></label>
                        <input id="starting_date" name='starting_date' className="form-input w-full" type="date" required />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="finish_date">תאריך סיום משוער<span className="text-rose-500">*</span></label>
                        <input id="finish_date" name='finish_date' className="form-input w-full" type="date" required />
                      </div>

                    </div>
                  </div>

                  <div className="col-12">
                      <button type = "submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white">הוסף !</button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddSaving;


