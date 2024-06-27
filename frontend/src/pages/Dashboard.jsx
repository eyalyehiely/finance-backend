import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
// import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/IncomesCard';
import DashboardCard03 from '../partials/dashboard/SavingsCard';
import DashboardCard04 from '../partials/dashboard/IncomesAndExpensesCard';
import DashboardCard05 from '../partials/dashboard/NotesCard';
import DashboardCard06 from '../partials/dashboard/ExpensesKindsCard';
import DashboardCard07 from '../partials/dashboard/ExpensesTableCard';
import Rights from '/src/components/Rights';


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden" dir="rtl">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            {/* <div className="sm:flex sm:justify-between sm:items-right mb-8"> */}

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              {/* <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-start gap-2">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add View</span>
                </button>                
              </div> */}

            {/* </div> */}

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* הודעות */}
              <DashboardCard05 />

              {/* הכנסות */}
              <DashboardCard01 />

              {/* חלוקת הוצאות חודשית */}
              <DashboardCard06 />

              {/* הוצאות מול הכנסות */}
              <DashboardCard04 />

                {/* חסכונות */} 
              <DashboardCard03 />

              {/* שלושת ההוצאות הגדולות ביותר */}
              <DashboardCard07 />
             
              
            </div>

          </div>
        </main>

      </div>
<Rights/>
    </div>
  );
}

export default Dashboard;
