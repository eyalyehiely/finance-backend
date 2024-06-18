import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import axios from 'axios';
import Icon from '../../images/icon-03.svg';



function IncomesAndExpensesCard() {
  const [allExpenses, setAllExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  function fetchExpensesData() {
    setLoading(true);
    axios.post('http://localhost:8000/api/expenses/fetch_user_expenses/',{},{
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setAllExpenses(response.data.all_expenses)
          
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
  function fetchIncomesData() {
    setLoading(true);
    axios.post('http://localhost:8000/api/incomes/fetch_user_incomes/',{},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setIncomes(response.data.month_revenues)
          
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

const difference = incomes - allExpenses
  const chartData = {
    labels: ['הוצאות', 'הכנסות','הפרש'],
    datasets: [
      {
        data: [
          allExpenses || 0, // Data for expenses
          incomes || 0, //Data for incomes
          difference || 0, //Data for difference
        ],
        backgroundColor: [
          'rgb(255, 99, 132)', // Color for incomes
          'rgb(75, 192, 192)', // Color for expenses
          'rgb(255, 255, 0)', // Color for difference

          
        ],
        hoverBackgroundColor: [
          'rgb(255, 99, 132)', // Color for incomes
          'rgb(75, 192, 192)', // Color for expenses
          'rgb(255, 255, 0)', // Color for difference
          
        ],
        borderWidth: 0,
      },
    ],
  };
  useEffect(() => {
    fetchExpensesData(); // Call fetchData when the component mounts
  }, []);
  useEffect(() => {
    fetchIncomesData(); // Call fetchData when the component mounts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <img src={Icon} width="32" height="32" alt="Icon 03" />
        <h2 dir = "rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">הוצאות vs הכנסות (חודשי)</h2>

      </header>
      {error && <div className="text-red-600 p-4">{error}</div>}
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default IncomesAndExpensesCard;
