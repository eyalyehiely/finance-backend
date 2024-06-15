import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';


function AddExpense() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('no');
  const [creditCards, setCreditCards] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  function fetchData() {
    const payment_method = document.getElementById('payment_method').value;
    const expense_type = document.getElementById('expense_type').value;
    const date_and_time = document.getElementById('date_and_time').value;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const credit_card = document.getElementById('credit_card')?.value || '';

    axios.post('http://localhost:8000/api/add_expense/', {
      name: name,
      payment_method: payment_method,
      expense_type: expense_type,
      date_and_time: date_and_time,
      category: category,
      price: price,
      credit_card: credit_card,
    }, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      swal({
        title: "💰!עבודה טובה",
        text: " !הוצאה נוספה בהצלחה",
        icon: "success",
        button: "אישור",
      }).then(() => {
        window.location.href = '/expenses/all-expenses';
      });
    }).catch((error) => {
      console.error('Error:', error.response.data.message);
      swal({
        title: "Ⅹ!שגיאה ",
        text: "!שגיאת BACKEND",
        icon: "warning",
        button: "אישור",
      });
    });
  }

  function getCreditData() {
    axios.post('http://localhost:8000/api/get_credit_card/', {}, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        setCreditCards(response.data.credit_cards);
      } else {
        console.log('Error:', response.data.message);
        swal({
          title: "Ⅹ!שגיאה ",
          text: "!שגיאת frontend",
          icon: "warning",
          button: "אישור",
        });
      }
    }).catch(error => {
      console.error('There was an error!', error);
      swal({
        title: "Ⅹ!שגיאה ",
        text: "!שגיאת BACKEND",
        icon: "warning",
        button: "אישור",
      });
    });
  }

  useEffect(() => {
    getCreditData();
  }, []);

  function isCreditCard() {
    if (status === 'credit_card') {
      return (
        <div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="credit_card">שם האשראי<span className="text-rose-500">*</span></label>
            <div className="relative">
              <select id='credit_card' name='credit_card' className="form-input w-full" required>
                <option value=""></option>
                {creditCards.length > 0 ? (
                  creditCards.map((creditCard) => (
                    <option key={creditCard.id} value={creditCard.name}>{creditCard.name}</option>
                  ))
                ) : (
                  <option value="">אין אשראי זמין</option>
                )}
              </select>
              <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="flex h-[100vh] overflow-hidden" dir="rtl">
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
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">הוסף הוצאה</h1>
            </div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <NavLink
                end
                to="/expenses/all-expenses"
                className={({ isActive }) =>
                  'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                }
              >
                <span className="hidden xs:block ml-2 text-white">חזור</span>
              </NavLink>
            </button>
            <div className="border-t border-slate-200 dark:border-slate-700">
              {/* Components */}
              <form action="AddExpense" method="post" onSubmit={handleSubmit}>
                <div className="space-y-8 mt-8">
                  {/* Input Types */}
                  <div>
                    <div className="grid gap-5 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">שם ההוצאה<span className="text-rose-500">*</span></label>
                        <input id="name" name='name' className="form-input w-full" type="text" required />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium mb-1" htmlFor="payment_method">דרך תשלום<span className="text-rose-500">*</span></label>
                        </div>
                        <select id='payment_method' name='payment_method' className="form-input w-full" required
                          onChange={(e) => setStatus(e.target.value)}>
                          <option value=""></option>
                          <option value="credit_card">כרטיס אשראי</option>
                          <option value="direct_debit">הוראת קבע</option>
                          <option value="transaction">העברה בנקאית</option>
                          <option value="cash">מזומן</option>
                          <option value="check">צ׳ק</option>
                        </select>
                      </div>
                      {isCreditCard()}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="date_and_time">תאריך ההוצאה<span className="text-rose-500">*</span></label>
                        <input id="date_and_time" name='date_and_time' className="form-input w-full" type="datetime-local" required />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="expense_type"> סוג ההוצאה<span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <select id='expense_type' name='expense_type' className="form-input w-full" required>
                            <option value=""></option>
                            <option value="regular_expense">הוצאה רגילה</option>
                            <option value="iregular_expense">הוצאה לא רגילה</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="category">קטגוריה<span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <select id='category' name='category' className="form-input w-full" required>
                            <option value=""></option>
                            <option value="supermarket">סופר</option>
                            <option value="restaurant">מסעדה</option>
                            <option value="tech">טכנולוגיה</option>
                            <option value="dress_and_shoes">הלבשה והנעלה</option>
                            <option value="fuel">דלק</option>
                            <option value="loan">הלוואה</option>
                            <option value="debt">חוב</option>
                            <option value="gift">מתנה</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="price">מחיר<span className="text-rose-500">*</span></label>
                        <input id="price" name="price" className="form-input w-full" type="number" required placeholder='₪' />
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white">הוסף!</button>
                      </div>


                    </div>
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

export default AddExpense;
