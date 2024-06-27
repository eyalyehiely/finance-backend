import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import Icon from '../../images/icon-03.svg';
import fetchCurrentMonthExpenses from '../../functions/expenses/fetchCurrentMonthExpenses';
import fetchCurrentMonthIncomes from '../../functions/incomes/fetchCurrentMonthIncomes'



function IncomesAndExpensesCard() {
  const [expenses, setExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;


const difference = incomes - expenses
  const chartData = {
    labels: ['הוצאות', 'הכנסות','הפרש'],
    datasets: [
      {
        data: [
          expenses || 0, // Data for expenses
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
    fetchCurrentMonthExpenses(token,setExpenses); // Call fetchData when the component mounts
  }, []);
  useEffect(() => {
    fetchCurrentMonthIncomes(token,setLoading,setIncomes,setError); // Call fetchData when the component mounts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <img src={Icon} width="32" height="32" alt="Icon 03" />
        <h2 dir = "rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">הוצאות vs הכנסות (חודשי)</h2>

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

export default IncomesAndExpensesCard;





