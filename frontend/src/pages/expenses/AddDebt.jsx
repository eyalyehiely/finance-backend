import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import {NavLink} from 'react-router-dom';
import addDebtData  from '/src/functions/debts/addDebtData.js';
import Rights from '/src/components/Rights.jsx';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData'

function AddDebt() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('no');
  const [creditCards, setCreditCards] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;


  useEffect(() => {
    getCreditCardData(token,setCreditCards);
  }, []);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    addDebtData(token)
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
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">הוסף הוצאה </h1>
            </div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <NavLink
                    end
                    to="/expenses/all-debts"
                    className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                    }
                    >
                    <span className="hidden xs:block ml-2 text-white">חזור </span>
                  </NavLink>
              </button>
            <div className="border-t border-slate-200 dark:border-slate-700">
              {/* Components */}
              <form action="AddDebt" method="post" onSubmit={handleSubmit}>
                <div className="space-y-8 mt-8">
                  {/* Input Types */}
                  <div>
                    <div className="grid gap-5 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">שם החוב<span className="text-rose-500">*</span></label>
                        <input id="name" name='name' className="form-input w-full" type="text" required />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium mb-1" htmlFor="type">סוג החוב<span className="text-rose-500">*</span></label>
                        </div>
                        <select id='type' name='type' className="form-input w-full" required
                            onChange={(e) => setStatus(e.target.value)}>
                           <option value=""></option>
                            <option value="mortgage">משכנתא</option>
                            <option value="goverment">ממשלתית</option>
                            <option value="loan">הלוואה</option>
                            <option value="business">עסק</option>
                            <option value="medical">רפואי</option>
                            <option value="car">משכון רכב</option>
                        </select>
                      </div>
                      {isCreditCard()}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="amount">סכום החוב<span className="text-rose-500">*</span></label>
                        <input id="amount" name='amount' className="form-input w-full" type="number" required placeholder='₪' />

                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="line_of_debt">מסגרת החוב<span className="text-rose-500">*</span></label>
                        <div className="relative">
                        <input id='line_of_debt' name='line_of_debt' className="form-input w-full" required type="number" placeholder='₪' ></input>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="interest">ריבית<span className="text-rose-500">*</span></label>
                        <div className="relative">
                        <input id='interest' name='interest' className="form-input w-full" required type="number" placeholder='%' />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="starting_date">תאריך התחלה<span className="text-rose-500">*</span></label>
                        <input id="starting_date" name="starting_date" className="form-input w-full" type="date" required  />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="finish_date">תאריך סיום משוער<span className="text-rose-500">*</span></label>
                        <input id="finish_date" name="finish_date" className="form-input w-full" type="date" required  />
                      </div>
                      <div className="col-12">
                      <button type = "submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white">הוסף !</button>

                    </div>
                    </div>
                  </div>
                   
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

export default AddDebt;


