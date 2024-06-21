import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpensesTableCard() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;


  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  function fetchData(event = null) {
    if (event) {
      event.preventDefault();
    }

    axios.post('http://localhost:8000/api/expenses/fetch_expenses_table/', {},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    
    }).then(response => {
        if (response.data.status === 200) {
          console.log('sorted_expenses:', response.data.sorted_expenses); // Log the data
          setExpenses(response.data.sorted_expenses);
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

  return (
    
    <div dir="rtl" className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">ההוצאות הגדולות ביותר</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div dir='rtl' className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-right">מס״ד</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-right">שם ההוצאה</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-right">תאריך ההוצאה</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-right">דרך תשלום</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-right">סכום</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {expenses.length > 0 ? (
  expenses.map((expense, index) => (
    <tr key={index}>
      <td className="p-2">
        <div className="text-right">{index + 1}</div>
      </td>
      <td className="p-2">
        <div className="text-right">{expense[0]}</div> {/* Name */}
      </td>
      <td className="p-2">
        <div className="text-right">{new Date(expense[1]).toLocaleDateString()}</div> {/* Date */}
      </td>
      <td className="p-2">
        <div className="text-right">{expense[2]}</div> {/* Payment Method */}
      </td>
      <td className="p-2">
        <div className="text-right">{expense[3]}</div> {/* Price */}
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className="p-2 text-center">אין נתונים</td>
  </tr>
)}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExpensesTableCard;
