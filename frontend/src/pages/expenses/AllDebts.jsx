import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import DebtTable from './DebtTable';
import PaginationClassic from '../../components/PaginationClassic';
import Rights from '../../components/Rights';
import AddDebt from '../../pages/expenses/AddDebt'



function AllDebts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);  
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
                  <AddDebt/> 
              </div>

            </div>
            {/* Table */}
            <DebtTable selectedItems={handleSelectedItems} />

          </div>
        </main>

      </div>
      <Rights/>
    </div>
  );
  
}

export default AllDebts;
