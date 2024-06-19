import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Fintech from './pages/Fintech';
import AllExpenses from './pages/expenses/AllExpenses';
import AddExpense from './pages/expenses/AddExpense';
import ExpensesTable from './pages/expenses/ExpensesTable';
import AllDebts from './pages/expenses/AllDebts';
import AddDebt from './pages/expenses/AddDebt';
import DebtTable from './pages/expenses/DebtTable';
import CreditCards from './pages/creditCards/CreditCards';
import AddCreditCard from './pages/creditCards/AddCreditCard';
import AllIncomes from './pages/incomes/Allincomes';

import AddIncome from './pages/incomes/AddIncome';
import AllSavings from './pages/incomes/AllSavings';
import AddSaving from './pages/incomes/AddSaving';


import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ButtonPage from './pages/component/ButtonPage';
import FormPage from './pages/component/FormPage';
import DropdownPage from './pages/component/DropdownPage';
import AlertPage from './pages/component/AlertPage';
import ModalPage from './pages/component/ModalPage';
import PaginationPage from './pages/component/PaginationPage';
import TabsPage from './pages/component/TabsPage';
import BreadcrumbPage from './pages/component/BreadcrumbPage';
import BadgePage from './pages/component/BadgePage';
import AvatarPage from './pages/component/AvatarPage';
import TooltipPage from './pages/component/TooltipPage';
import AccordionPage from './pages/component/AccordionPage';
import IconsPage from './pages/component/IconsPage';
import ChangePassword from './pages/changePasswordPage.jsx'
// import ProtectedRoute from './protectedRoute';





function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        
        <Route exact path="/" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} /> */}
        <Route path="/dashboard/fintech" element={<Fintech />} />
        {/* expenses */}
        <Route path="/expenses/all-expenses" element={<AllExpenses />} />
        <Route path="/expenses/expenses-table" element={<ExpensesTable />} />

        {/* <Route path="/expenses/add-expenses" element={<ProtectedRoute element={AddExpense} />} /> */}


        {/* debts */}
        <Route path="/expenses/all-debts" element={<AllDebts />} />
        <Route path="/expenses/debt-table" element={<DebtTable />} />
        <Route path="/expenses/add-debt" element={<AddDebt />} />

        {/* credit cards */}
        <Route path="/creditcards/all-cards" element={<CreditCards />} />
        <Route path="/creditcards/add-credit-card" element={<AddCreditCard />} />

        {/* savings */}
        <Route path="/incomes/all-savings" element={<AllSavings />} />
        <Route path="/incomes/add-saving" element={<AddSaving />} />

        {/* incomes */}
        <Route path="/incomes/all-incomes" element={<AllIncomes />} />
        <Route path="/incomes/add-income" element={<AddIncome />} />

       
        {/* authentication */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change_password" element={<ChangePassword />} />

        {/* components */}
        <Route path="/component/button" element={<ButtonPage />} />
        <Route path="/component/form" element={<FormPage />} />
        <Route path="/component/dropdown" element={<DropdownPage />} />
        <Route path="/component/alert" element={<AlertPage />} />
        <Route path="/component/modal" element={<ModalPage />} />
        <Route path="/component/pagination" element={<PaginationPage />} />
        <Route path="/component/tabs" element={<TabsPage />} />
        <Route path="/component/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="/component/badge" element={<BadgePage />} />
        <Route path="/component/avatar" element={<AvatarPage />} />
        <Route path="/component/tooltip" element={<TooltipPage />} />
        <Route path="/component/accordion" element={<AccordionPage />} />
        <Route path="/component/icons" element={<IconsPage />} />
      </Routes>
    </>
  );
}

export default App;
