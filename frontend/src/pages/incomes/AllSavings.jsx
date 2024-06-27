import React, {useState} from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationClassic from '../../components/PaginationClassic';
import SavingsTable from './SavingsTable';
import Rights from '/src/components/Rights';
import AddSaving from '../../pages/incomes/AddSaving'



function AllSavings() {
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
                {/* <SearchForm placeholder="Search by invoice ID…" /> */}
                {/* Create invoice button */}
               
              <AddSaving />

              </div>

            </div>

            {/* Table */}
            <SavingsTable selectedItems={handleSelectedItems} />
            

            Pagination
            <div className="mt-8">
              <PaginationClassic />
            </div>

          </div>
        </main>

      </div>
<Rights/>
    </div>
  );
}

export default AllSavings;
