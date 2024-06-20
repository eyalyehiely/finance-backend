

// import React, { useState, useEffect } from 'react';
// import fetchExpensesData from '/src/functions/expenses/fetchExpensesData.js';
// import saveEdit from '../../functions/expenses/saveEdit';
// import AddCommaToNumber from '../../components/AddComma';
// import deleteExpense from '../../functions/expenses/deleteExpense';
// import getActiveCreditCards from '../../functions/credit_cards/getActiveCreditCards';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

// function ExpensesTable() {
//   const [expenses, setExpenses] = useState([]);
//   const [editingExpenseId, setEditingExpenseId] = useState(null);
//   const [editedExpense, setEditedExpense] = useState({});
//   const [creditCards, setCreditCards] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

//   useEffect(() => {
//     fetchExpensesData(token, setExpenses);
//     getActiveCreditCards(token, setCreditCards); // Fetch credit cards on component mount
//   }, [token]);

//   const handleEditChange = (event, field) => {
//     setEditedExpense({
//       ...editedExpense,
//       [field]: event.target.value,
//     });
//   };

//   const startEdit = (expense) => {
//     setEditingExpenseId(expense.id);
//     setEditedExpense({ ...expense });
//     setShowModal(true);
//   };

//   const cancelEdit = () => {
//     setEditingExpenseId(null);
//     setEditedExpense({});
//     setShowModal(false);
//   };

//   const saveChanges = () => {
//     saveEdit(token, editedExpense, editingExpenseId, setExpenses);
//     setEditingExpenseId(null);
//     setEditedExpense({});
//     setShowModal(false);
//   };

//   return (
//     <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative" dir="rtl">
//       <header className="px-5 py-4">
//         <h2 className="font-semibold text-slate-800 dark:text-slate-100">
//           הוצאות <span className="text-slate-400 dark:text-slate-500 font-medium">{expenses.length}</span>
//         </h2>
//       </header>
//       <div className="overflow-x-auto" dir="rtl">
//         <table className="table-auto w-full dark:text-slate-300">
//           <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
//             <tr>
//               <th className="p-2">
//                 <div className="font-semibold text-right">מס״ד</div>
//               </th>
//               <th className="p-2">
//                 <div className="font-semibold text-right">שם ההוצאה</div>
//               </th>
//               <th className="p-2">
//                 <div className="font-semibold text-right">דרך תשלום</div>
//               </th>
//               <th className="p-2">
//                 <div className="font-semibold text-right">סכום</div>
//               </th>
//               <th className="p-2">
//                 <div className="font-semibold text-right">תאריך ההוצאה</div>
//               </th>
//               <th className="p-2">
//                 <div className="font-semibold text-right">פעולות</div>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
//             {expenses.length > 0 ? (
//               expenses.map((expense, index) => (
//                 <React.Fragment key={expense.id}>
//                   <tr>
//                     <td className="p-2">
//                       <div className="text-right">{index + 1}</div>
//                     </td>
//                     <td className="p-2">
//                       {editingExpenseId === expense.id ? (
//                         <input
//                           type="text"
//                           id="name"
//                           className="text-right"
//                           value={editedExpense.name || ''}
//                           onChange={(e) => handleEditChange(e, 'name')}
//                         />
//                       ) : (
//                         <div className="text-right">{expense.name}</div>
//                       )}
//                     </td>
//                     <td className="p-2">
//                       {editingExpenseId === expense.id ? (
//                         <select
//                           id="payment_method"
//                           className="text-right"
//                           value={editedExpense.payment_method || ''}
//                           onChange={(e) => handleEditChange(e, 'payment_method')}
//                         >
//                           <option value=""></option>
//                           <option value="credit_card">כרטיס אשראי</option>
//                           <option value="direct_debit">הוראת קבע</option>
//                           <option value="transaction">העברה בנקאית</option>
//                           <option value="cash">מזומן</option>
//                           <option value="check">צ׳ק</option>
//                         </select>
//                       ) : (
//                         <div className="text-right">{expense.payment_method}</div>
//                       )}
//                     </td>
//                     <td className="p-2">
//                       {editingExpenseId === expense.id ? (
//                         <input
//                           type="text"
//                           id="price"
//                           className="text-right"
//                           value={editedExpense.price || ''}
//                           onChange={(e) => handleEditChange(e, 'price')}
//                         />
//                       ) : (
//                         <div className="text-right">{AddCommaToNumber(expense.price)}</div>
//                       )}
//                     </td>
//                     <td className="p-2">
//                       {editingExpenseId === expense.id ? (
//                         <input
//                           type="datetime-local"
//                           id="date_and_time"
//                           className="text-right"
//                           value={new Date(editedExpense.date_and_time || '').toISOString().slice(0, 16)}
//                           onChange={(e) => handleEditChange(e, 'date_and_time')}
//                         />
//                       ) : (
//                         <div className="text-right">{new Date(expense.date_and_time).toLocaleString()}</div>
//                       )}
//                     </td>
//                     <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
//                       <div className="space-x-1">
//                         {editingExpenseId === expense.id ? (
//                           <>
//                             <button
//                               className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
//                               onClick={saveChanges}
//                             >
//                               <span className="sr-only">Save</span>
//                               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
//                                 <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
//                                 <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
//                               </svg>
//                             </button>
//                             <button
//                               className="text-rose-500 hover:text-rose-600 rounded-full"
//                               onClick={cancelEdit}
//                             >
//                               <span className="sr-only">Cancel</span>
//                               <svg className="w-10 h-6 fill-current" viewBox="0 0 32 32">
//                                 <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm7 19a1 1 0 0 1-1.414 1.414L16 17.414l-5.586 5.586A1 1 0 0 1 9 21.586l5.586-5.586L9 10.414A1 1 0 0 1 10.414 9l5.586 5.586 5.586-5.586A1 1 0 0 1 23 10.414l-5.586 5.586Z" />
//                               </svg>
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
//                               onClick={() => startEdit(expense)}
//                             >
//                               <span className="sr-only">Edit</span>
//                               <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
//                                 <path d="M19.708 8.793a1 1 0 0 0 0-1.414l-2.086-2.086a1 1 0 0 0-1.414 0l-11.379 11.38a1 1 0 0 0-.244.43l-1.4 4.8a1 1 0 0 0 1.243 1.243l4.8-1.4a1 1 0 0 0 .43-.244l11.38-11.38ZM4.564 18.571l9.943-9.943 2.829 2.829-9.943 9.943-3.172.924.924-3.172Z" />
//                                 <path d="M27.121 10.879a1 1 0 0 0 0-1.414l-5.086-5.086a1 1 0 0 0-1.414 0L18 7v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2h-2V7a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v2h2v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v2a1 1 0 0 0 1 1h2v-2h2v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2l2.621 2.621a1 1 0 0 0 1.414 0l5.086-5.086ZM24 11.293 20.707 8 22 6.707 25.293 10 24 11.293Z" />
//                               </svg>
//                             </button>
//                             <button
//                               className="text-rose-500 hover:text-rose-600 rounded-full"
//                               onClick={() => deleteExpense(token, expense.id, setExpenses)}
//                             >
//                               <span className="sr-only">Delete</span>
//                               <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
//                                 <path d="M13 12h2v12h-2zm4 0h2v12h-2z" />
//                                 <path d="M25 7h-5V6a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H7a1 1 0 0 0 0 2h1v19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9h1a1 1 0 0 0 0-2zM13 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4zm10 22a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9h14z" />
//                               </svg>
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                   {editingExpenseId === expense.id && editedExpense.payment_method === 'credit_card' && (
//                     <Modal show={showModal} onHide={cancelEdit}>
//                       <Modal.Header closeButton>
//                         <Modal.Title>Select Credit Card</Modal.Title>
//                       </Modal.Header>
//                       <Modal.Body>
//                         <Form.Group>
//                           <Form.Label>Credit Card</Form.Label>
//                           <Form.Control
//                             as="select"
//                             value={editedExpense.credit_card || ''}
//                             onChange={(e) => handleEditChange(e, 'credit_card')}
//                           >
//                             <option value=""></option>
//                             {creditCards.map((card) => (
//                               <option key={card.id} value={card.id}>
//                                 {card.name}
//                               </option>
//                             ))}
//                           </Form.Control>
//                         </Form.Group>
//                       </Modal.Body>
//                       <Modal.Footer>
//                         <Button variant="secondary" onClick={cancelEdit}>
//                           Close
//                         </Button>
//                         <Button variant="primary" onClick={saveChanges}>
//                           Save Changes
//                         </Button>
//                       </Modal.Footer>
//                     </Modal>
//                   )}
//                 </React.Fragment>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-4">
//                   אין הוצאות להצגה
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ExpensesTable;



import React, { useState, useEffect } from 'react';
import fetchExpensesData from '/src/functions/expenses/fetchExpensesData.js';
import saveEdit from '../../functions/expenses/saveEdit';
import AddCommaToNumber from '../../components/AddComma';
import deleteExpense from '../../functions/expenses/deleteExpense';
import getActiveCreditCards from '../../functions/credit_cards/getActiveCreditCards';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [creditCards, setCreditCards] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    fetchExpensesData(token, setExpenses);
    getActiveCreditCards(token, setCreditCards); // Fetch credit cards on component mount
  }, [token]);

  const handleEditChange = (event, field) => {
    setEditedExpense({
      ...editedExpense,
      [field]: event.target.value,
    });
  };

  const startEdit = (expense) => {
    setEditingExpenseId(expense.id);
    setEditedExpense({ ...expense });
  };

  const cancelEdit = () => {
    setEditingExpenseId(null);
    setEditedExpense({});
  };

  const saveChanges = () => {
    saveEdit(token, editedExpense, editingExpenseId, setExpenses);
    setEditingExpenseId(null);
    setEditedExpense({});
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative" dir="rtl">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          הוצאות <span className="text-slate-400 dark:text-slate-500 font-medium">{expenses.length}</span>
        </h2>
      </header>
      <div className="overflow-x-auto" dir="rtl">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-right">מס״ד</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">שם ההוצאה</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">דרך תשלום</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">סכום</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">תאריך ההוצאה</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">פעולות</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td className="p-2">
                    <div className="text-right">{index + 1}</div>
                  </td>
                  <td className="p-2">
                    {editingExpenseId === expense.id ? (
                      <input
                        type="text"
                        id="name"
                        className="text-right"
                        value={editedExpense.name || ''}
                        onChange={(e) => handleEditChange(e, 'name')}
                      />
                    ) : (
                      <div className="text-right">{expense.name}</div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingExpenseId === expense.id ? (
                      <select
                        id="payment_method"
                        className="text-right"
                        value={editedExpense.payment_method || ''}
                        onChange={(e) => handleEditChange(e, 'payment_method')}
                      >
                        <option value=""></option>
                        <option value="credit_card">כרטיס אשראי</option>
                        <option value="direct_debit">הוראת קבע</option>
                        <option value="transaction">העברה בנקאית</option>
                        <option value="cash">מזומן</option>
                        <option value="check">צ׳ק</option>
                      </select>
                    ) : (
                      <div className="text-right">{expense.payment_method}</div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingExpenseId === expense.id ? (
                      <input
                        type="text"
                        id="price"
                        className="text-right"
                        value={editedExpense.price || ''}
                        onChange={(e) => handleEditChange(e, 'price')}
                      />
                    ) : (
                      <div className="text-right">{AddCommaToNumber(expense.price)}</div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingExpenseId === expense.id ? (
                      <input
                        type="datetime-local"
                        id="date_and_time"
                        className="text-right"
                        value={new Date(editedExpense.date_and_time || '').toISOString().slice(0, 16)}
                        onChange={(e) => handleEditChange(e, 'date_and_time')}
                      />
                    ) : (
                      <div className="text-right">{new Date(expense.date_and_time).toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div className="space-x-1">
                      {editingExpenseId === expense.id ? (
                        <>
                          <button
                            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                            onClick={saveChanges}
                          >
                            <span className="sr-only">Save</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
                              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                          </button>
                          <button
                            className="text-rose-500 hover:text-rose-600 rounded-full"
                            onClick={cancelEdit}
                          >
                            <span className="sr-only">Cancel</span>
                            <svg className="w-10 h-6 fill-current" viewBox="0 0 32 32">
                              <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm7 19a1 1 0 0 1-1.414 1.414L16 17.414l-5.586 5.586A1 1 0 0 1 9 21.586l5.586-5.586L9 10.414A1 1 0 0 1 10.414 9l5.586 5.586 5.586-5.586A1 1 0 0 1 23 10.414l-5.586 5.586Z" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                            onClick={() => startEdit(expense)}
                          >
                            <span className="sr-only">Edit</span>
                            <span className="sr-only">Edit</span>
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                            </svg>
                          </button>
                          <button
                            className="text-rose-500 hover:text-rose-600 rounded-full"
                            onClick={() => deleteExpense(token, expense.id, setExpenses)}
                          >
                            <span className="sr-only">Delete</span>
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  אין הוצאות להצגה
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editedExpense.payment_method === 'credit_card' &&  (
        <Modal show={true} onHide={cancelEdit} dir="rtl">
          <Modal.Header >
            <Modal.Title>בחר כרטיס אשראי</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>כרטיס אשראי</Form.Label>
              <Form.Control
                as="select"
                value={editedExpense.credit_card || ''}
                onChange={(e) => handleEditChange(e, 'credit_card')}
              >
                <option value=""></option>
                {creditCards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelEdit}>
              סגור
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              שמור שינויים
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ExpensesTable;
