import React,{useState} from 'react';
import Icon from '../../images/icon-02.svg';
import axios from 'axios'
import { useEffect } from 'react';




function DashboardCard02() {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
    const [amount, setAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function fetchData(event = null) {
      setLoading(true);
      if (event) {
        event.preventDefault();
      }
      axios.post('http://localhost:8000/api/fetch_user_expenses/',{},{
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
    }).then(response => {
      setLoading(false);
          if (response.data.status ===200) {
              console.log({'all_expenses':response.data.all_expenses});
              setAmount(response.data.all_expenses); 
          } else {
              setError(response.data.message);
              console.log('Error:', response.data.message);
              // alert(response.data.message);
          }
      })
      .catch(error => {
        setLoading(false);
        setError('An error occurred while fetching data.');
        console.error('There was an error!', error);
        // alert('An error occurred while fetching data.');
    });
  }

 
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
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


export default DashboardCard02;
