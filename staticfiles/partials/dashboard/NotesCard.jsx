import React, { useState, useEffect } from 'react';
import getActiveCreditCards from '../../functions/credit_cards/getActiveCreditCards';
import axios from 'axios';

function NotesCard() {
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
  const [creditCards, setCreditCards] = useState([]);
  const [notes, setNotes] = useState('אין הודעות חדשות'); // Default note when no condition is met
  const [expenses,setExpenses] = useState([]);

  axios.post('http://localhost:8000/api/expenses/fetch_user_expenses/',{},{
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(response => {
      if (response.data.status === 200) {
        setExpenses(response.data.credit_card);
      } else {
        console.log('error');
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });











  useEffect(() => {
    getActiveCreditCards(token, setCreditCards);
  }, [token]);

  useEffect(() => {
    // Checking credit card conditions
    if (creditCards.length > 0) {
      const hasExceededLimit = creditCards.some(card => card.line_of_credit * 0.75 > expenses);
      
      if (hasExceededLimit) {
        setNotes('הנך קרוב לחריגה בכרטיס האשראי');
        swal({
          title: "הנך קרוב לחריגה בכרטיס האשראי",
          icon: "warning",
          button: "אישור",
        })
      } else {
        setNotes('אין הודעות חדשות');
      }
    } else {
      setNotes('אין הודעות חדשות');
    }
  }, [creditCards]);
  

  return (
    
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">הודעות</h2>
        {/* <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap"></div>
        </Tooltip> */}
      </header>
      <div className="text-m text-center whitespace-nowrap">
        {notes}
      </div>
    </div>
  );
  
}

export default NotesCard;

