import React,{useState} from 'react';
import Icon from '../../images/icon-02.svg';
import { useEffect } from 'react';
import fetchCurrentMonthExpenses from '../../functions/expenses/fetchCurrentMonthExpenses';

function ExpensesCard() {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
    const [amount, setAmount] = useState(null);
    

    
 
  useEffect(() => {
    fetchCurrentMonthExpenses(token,setAmount); // Call fetchData when the component mounts
  }, []);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 02" />
        </header>
        <h2 dir="rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">הוצאות (החודש)</h2>
        <div dir="rtl" className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{amount}₪</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">-14%</div>
        </div>
      </div>
    </div>
  );
}


export default ExpensesCard;
