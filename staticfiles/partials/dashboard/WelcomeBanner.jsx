import React from 'react';
import Note from '../../components/UserNote';
import {jwtDecode} from 'jwt-decode';

function WelcomeBanner() {
  const first_name = jwtDecode(localStorage.getItem('authTokens')).first_name;
  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-800 p-4 sm:p-6 rounded-full overflow-hidden mb-8">
      {/* Content */}
      <div dir="rtl" className="relative">
        <h2 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          <Note /> {first_name} 👋
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
