import React, { useState, useEffect } from 'react';
import Icon from '../../images/icon-01.svg';
import axios from 'axios';

function IncomesCard() {
  const [amount, setAmount] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  function fetchData(event = null) {
    if (event) {
      event.preventDefault();
    }

    axios.post('http://localhost:8000/api/incomes/fetch_user_incomes/', {}, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        console.log({ 'month_revenues': response.data.month_revenues });
        setAmount(response.data.month_revenues);
      } else {
        console.log('Error:', response.data.message);
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error status:', error.response.status);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from server:', error.request);
        alert('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        alert('An unexpected error occurred.');
      }
    });
  }

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <img src={Icon} width="32" height="32" alt="Icon 01" />
        </header>
        <h2 dir="rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">הכנסות (החודש)</h2>
        <div dir="rtl" className="flex items-start">
          {amount !== null ? (
            <>
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{amount}₪</div>
              <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div>
            </>
          ) : (
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mr-2">אין נתונים</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IncomesCard;
