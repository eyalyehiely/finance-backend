import React, { useState, useEffect } from 'react';
import BarChart from '../../charts/BarChart01';
import Icon from '../../images/icon-03.svg';
import axios from '../../functions/axiosConfig'

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function SavingsCard() {
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchIncomesData() {
    setLoading(true);
    axios.post('/incomes/fetch_user_incomes/',{},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setSavings(response.data.month_savings)
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
    labels: ['חסכונות'],
    datasets: [
      // Blue bars
      {
        label: 'חסכונות',
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  useEffect(() => {
    fetchIncomesData(); // Call fetchData when the component mounts
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 03" />
          בהמשך - גרף חיזוי חסכונות 6 חודשים קדימה
        </header>
        <h2 dir="rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">חסכונות</h2>
        <div dir="rtl" className="flex items-start">
          {savings !== null ? (
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{savings}₪</div>
          ) : (
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mr-2">אין נתונים</div>
          )}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* <BarChart data={chartData} /> */}
      </div>
    </div>
  );
}

export default SavingsCard;
