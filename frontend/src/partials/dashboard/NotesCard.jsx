import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData';
// import LineOfCreditAlert from '../../components/LineOfCreditAlert';

const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

// const [creditCards,setCreditCards] = useState([])
// setCreditCards(getCreditCardData(token))
// creditCards.map =>((card,index)=>(
//   <span>{card.}</span>
// ))

function NotesCard() {


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">הודעות</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap"></div>
        </Tooltip>
      </header>
    
    </div>
  );
}

export default NotesCard;
