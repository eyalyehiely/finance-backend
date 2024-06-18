import React, { useState,useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { NavLink} from 'react-router-dom';
import CreditCardLogo from '../component/CreditCardLogo';
import Rights from '../../components/Rights';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData'
import deleteCard from '../../functions/credit_cards/deleteCard'
import EditCard from './EditCard'
import Button from 'react-bootstrap/esm/Button';

function CreditCards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  // const [chosenCard, setChosenCard] = useState([]);
  // const [logo, setLogo] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;


 
  

  useEffect(() => {
    getCreditCardData(token,setCreditCards);
  }, [token]);
  return (
    <div className="flex h-[100dvh] overflow-hidden" dir = "rtl">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">אשראי ✨</h1>
                </div>
                <div className='items-center'>
                {/* Add card button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ">
                  <NavLink
                    end
                    to="/creditcards/add-credit-card"
                    className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                    }
                    
                  >
                    <span className="hidden xs:block ml-2 text-white">
                      <svg className="w-4 h-4 fill-current  shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                    </span>
                  </NavLink>
              </button>
              </div>
              </div>

              {/* Filters */}
              <div className="mb-5">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">כל הכרטיסים {creditCards.length} </button>
                  </li>
                  {/* <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                      Physical Cards
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                      Virtual Cards
                    </button>
                  </li> */}
                </ul>
              </div>

              {/* Credit cards */}
              {creditCards.map((card, index) => (
              <div className="space-y-2">
                {/* Cards */}
                <label className="relative block cursor-pointer text-left w-full">
                  <input type="radio" id='credit_card'name="radio-buttons" className="peer sr-only" key={card.id} defaultChecked value={card.id}/>
                  
                  <div className="p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
                    <div className="grid grid-cols-12 items-center gap-x-2">
                      {/* Card decorate */}
                      <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                        <svg className="shrink-0" width="32" height="24" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient x1="1.829%" y1="100%" x2="100%" y2="2.925%" id="c1-a">
                              <stop stopColor="#475569" offset="0%" />
                              <stop stopColor="#1E293B" offset="100%" />
                              <stop stopColor="#9FA1FF" offset="100%" />
                            </linearGradient>
                          </defs>
                          <g fill="none" fillRule="evenodd">
                            <rect fill="url(#c1-a)" width="32" height="24" rx="3" />
                            <ellipse fill="#E61C24" fillRule="nonzero" cx="12.522" cy="12" rx="5.565" ry="5.647" />
                            <ellipse fill="#F99F1B" fillRule="nonzero" cx="19.432" cy="12" rx="5.565" ry="5.647" />
                            <path
                              d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z"
                              fill="#F26622"
                              fillRule="nonzero"
                            />
                          </g>
                        </svg>
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{card.name}</div>
                          <div className="text-xs">**{card.last_four_digits}</div>
                        </div>
                      </div>
                      {/* Name */}
                      {/* <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">Dominik Lamakani</div>
                      </div> */}
                      {/* Card limits */}
                      
                      <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                        <div className="text-sm">₪{card.amount_to_charge} / ₪{card.line_of_credit}</div>
                      </div>
                      {/* Card status */}
                      <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                        <div className="text-xs inline-flex font-medium bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400 rounded-full text-center px-2.5 py-1">
                          {card.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none"
                    aria-hidden="true"
                  />
                </label>

              </div>
              ))}
            </div>
           

        {creditCards.length > 0 ? (
        creditCards.map((card, index) => (
                  
        <div key={index}>
          {/* Sidebar */}
          <div>
            <div className="lg:sticky lg:top-16 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 lg:w-[390px] lg:h-[calc(100dvh-64px)]">
              <div className="py-8 px-4 lg:px-8">
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <div className="text-slate-800 dark:text-slate-100 font-semibold text-center mb-6">סיכום נתוני אשראי</div>

                  {/* Credit Card */}
                  <div className="relative aspect-[7/4] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden">
                    {/* Illustration on card */}
                    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
                      <svg className="w-full h-full" width="326" height="190" viewBox="0 0 326 190" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          {/* SVG Filters here */}
                        </defs>
                        <g fill="none" fillRule="evenodd">
                          {/* SVG Content here */}
                        </g>
                      </svg>
                    </div>
                    <div className="relative h-full flex flex-col justify-between">
                      {/* Logo on card */}
                      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="icon1-b">
                            <stop stopColor="#E2E8F0" offset="0%" />
                            <stop stopColor="#94A3B8" offset="100%" />
                          </linearGradient>
                          <linearGradient x1="50%" y1="24.537%" x2="50%" y2="99.142%" id="icon1-c">
                            <stop stopColor="#334155" offset="0%" />
                            <stop stopColor="#334155" stopOpacity="0" offset="100%" />
                          </linearGradient>
                          <path id="icon1-a" d="M16 0l16 32-16-5-16 5z" />
                        </defs>
                        <g transform="rotate(90 16 16)" fill="none" fillRule="evenodd">
                          <mask id="icon1-d" fill="#fff">
                            <use xlinkHref="#icon1-a" />
                          </mask>
                          <use fill="url(#icon1-b)" xlinkHref="#icon1-a" />
                          <path fill="url(#icon1-c)" mask="url(#icon1-d)" d="M16-6h20v38H16z" />
                        </g>
                      </svg>
                      
                      {/* Card number */}
                      <div className="flex justify-between text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
                        <span>{card.last_four_digits}</span>
                        <span>****</span>
                        <span>****</span>
                        <span>****</span>
                        {/* <span>{card.number}</span> */}
                      </div>
                      {/* Card footer */}
                      <div className="relative flex justify-between items-center z-10 mb-0.5">
                        {/* Card expiration */}
                        <div className="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
                          {/* <span>EXP {card.expiration}</span> */}
                        </div>
                      </div>

                      {/* Mastercard logo */}
                       {/* <svg className="absolute bottom-0 right-0" width="48" height="28" viewBox="0 0 48 28">
                        <circle fill="#F59E0B" cx="34" cy="14" r="14" fillOpacity=".8" />
                        <circle fill="#F43F5E" cx="14" cy="14" r="14" fillOpacity=".8" />
                      </svg> */}
                       
                      <CreditCardLogo cardName={card.name}/>

                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">פרטים</div>
                    <ul>
                      <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="text-sm">שם הכרטיס</div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{card.name}</div>
                      </li>
                      <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="text-sm">סוג הכרטיס</div>
                        <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{card.credit_type}</div>
                        
                      </li>
                      <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="text-sm">סטטוס</div>
                        <div className="flex items-center whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${card.status == 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${card.status == 'Active' ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                          <span>{card.status == 'Active' ? 'פעיל' : 'מושבת'}</span>
                      </div>


                          {/* <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{card.status}</div> */}
                        </div>
                      </li>
                      
                    </ul>
                  </div>

                  {/* Payment Limits */}
                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">מסגרת אשראי</div>
                    <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between text-sm mb-2">
                        <div>הוצאות החודש בכרטיס זה</div>
                        <div className="italic">
                        ₪{card.amount_to_charge} <span className="text-slate-400 dark:text-slate-500">/</span> ₪{card.line_of_credit}
                        </div>
                      </div>
                      <div className="relative w-full h-2 bg-slate-300 dark:bg-slate-700">
                        <div className="absolute inset-0 bg-emerald-500" aria-hidden="true" style={{ width: `${(card.amount_to_charge/ card.line_of_credit) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex items-center space-x-3 mt-6">
                  <EditCard card={card} />
  
                  <div className="w-1/2 ml-3">
                    <Button id={card.id} variant="danger" onClick={() => deleteCard(token, card.id)}>
                      <span className="ml-2"></span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </Button>
                  </div>
                </div>


          </div>
        </div>
      </div>
    </div>
    </div>
))
        ):(
          <div className="fixed bottom-10 w-full flex justify-center items-center py-80">
          לא נמצאו כרטיסים
          </div>
        
        )
        
}
            </div>
            
        </main>
      </div>
      <Rights/>
    </div>
    
  );
}

export default CreditCards;












// function chosenCreditCard(){
  //   const card_id = document.getElementById('credit_card').value || '';
  //   axios.get(`http://localhost:8000/api/get_chosen_credit_card/${card_id}/`, {},{
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     }
  //   }).then((response)=>{
  //     setChosenCard(response.data.chosen_credit_card)
  //     console.log(response.data.chosen_credit_card);
    
  //   }).catch((error) => {
  //       console.error("Error fetching chosen credit card:", error);
  //       swal({
  //         title: "Ⅹ!שגיאה",
  //         text: "שגיאת מערכת",
  //         icon: "warning",
  //         button: "אישור",
  //       });
  //   });
 
  // }