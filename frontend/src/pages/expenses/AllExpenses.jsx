
import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ExpensesTable from './ExpensesTable';
import Rights from '../../components/Rights';
import AddExpense from '../../pages/expenses/AddExpense';


function AllExpenses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  
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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
             
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-start gap-2">
                {/* Search form */}

                {/* Create invoice button */}
                <AddExpense />
              </div>
            </div>

            

            {/* Table */}
            <ExpensesTable selectedItems={handleSelectedItems} expenses={expenses} />

            {/* Pagination */}
            {/* <div className="mt-8">
              <PaginationClassic />
            </div> */}
          </div>
        </main>
      </div>
      <Rights />
    </div>
  );
}

export default AllExpenses;
