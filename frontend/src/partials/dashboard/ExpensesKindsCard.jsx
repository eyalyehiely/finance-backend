import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import axios from 'axios';



function ExpensesKindsCard() {
  const [creditCard, setCreditCard] = useState(null);
  const [debts, setDebts] = useState(null);
  const [cash, setCash] = useState(null);
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  function fetchData() {
    setLoading(true);
    axios.post('http://localhost:8000/api/expenses/fetch_user_expenses/',{},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setCreditCard(response.data.credit_card);
          setDebts(response.data.debts);
          setCash(response.data.cash);
          setCheck(response.data.check);
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError('An error occurred while fetching data.');
        console.error('There was an error!', error);
      });
  }


  const chartData = {
    labels: ['כרטיסי אשראי', 'חובות', 'מזומן','צ׳קים'],
    datasets: [
      {
        data: [
          creditCard || 0, // Data for creditCard
          debts || 0,      // Data for debts
          cash  || 0,          // Placeholder data for the fourth dataset
          check || 0,
        ],
        backgroundColor: [
          'rgb(75, 192, 192)', // Color for creditCard
          'rgb(255, 99, 132)', // Color for debts
          'rgb(54, 162, 235)', // Color for loans
          'rgb(255, 205, 86)', // Color for the fourth dataset
        ],
        hoverBackgroundColor: [
          'rgb(75, 192, 192)', // Hover color for creditCard
          'rgb(255, 99, 132)', // Hover color for debts
          'rgb(54, 162, 235)', // Hover color for loans
          'rgb(255, 205, 86)', // Hover color for the fourth dataset
        ],
        borderWidth: 0,
      },
    ],
  };
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 dir = "rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">חלוקת הוצאות (חודשי)</h2>
      </header>
      {error && <div className="text-red-600 p-4">{error}</div>}
      {loading ? (
        <div className="text-center p-4">אין נתונים</div>
      ) : (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default ExpensesKindsCard;
