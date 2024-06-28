import React, { useState, useEffect } from 'react';
import AddCommaToNumber from '../../components/AddComma'
import fetchSavingsData from '../../functions/savings/fetchSavingsData'
import deleteSaving from '../../functions/savings/deleteSaving';
import saveEdit from '../../functions/savings/saveEdit';




function SavingsTable() {
  const [savings, setSavings] = useState([]);
  const [editingSavingsId, setEditingSavingsId] = useState(null);
  const [filteredSavings, setFilteredSavings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const [editedSaving, setEditedSaving] = useState({});
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

 
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredSavings(
        savings.filter((saving) =>
          saving.saving_type.toLowerCase().includes(query) ||
          saving.amount.toString().includes(query) ||
          new Date(saving.starting_date).toLocaleString().includes(query)||
          new Date(saving.finish_date).toLocaleString().includes(query)
        )
      );
    } else {
      setFilteredSavings(savings);
    }
  }, [searchQuery, savings]);




  useEffect(() => {
    fetchSavingsData(token, setSavings);
  }, [token]);
  


  function handleEditChange(event, field) {
    setEditedSaving({
      ...editedSaving,
      [field]: event.target.value
    });
  }

  function startEdit(saving) {
    setEditingSavingsId(saving.id);
    setEditedSaving({...saving});
  }
  const cancelEdit = () => {
    setEditingSavingsId(null);
    setEditedSaving({}); // Reset editedSaving state to an empty object
  };

  const saveChanges = () => {
    saveEdit(token, editedSaving, editingSavingsId, setSavings);
  };


  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative" dir="rtl">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          חסכונות <span className="text-slate-400 dark:text-slate-500 font-medium">{filteredSavings.length}</span>
        </h2>
        <div className="my-4">
          <input
            type="text"
            placeholder="חפש חסכון..."
            className="form-control" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
          />
          
        </div>

      </header>
      <div className="overflow-x-auto" dir="rtl">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-right">מס״ד</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">סוג החסכון</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">סכום</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">ריבית</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">סכום סופי משוער</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">תאריך התחלה</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">תאריך סיום משוער</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-right">פעולות</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {filteredSavings.length > 0 ? (
              filteredSavings.map((saving, index) => (
                <tr key={saving.id}>
                  <td className="p-2">
                    <div className="text-right">{index + 1}</div>
                  </td>
                  {editingSavingsId === saving.id ? (
                    <>
                      <td className="p-2">
                        <select id="saving_type" type = 'number' className="text-right" value={editedSaving.saving_type} onChange={(e) => handleEditChange(e, 'saving_type')}>
                          <option value=""></option>
                          <option value="health">בריאות</option>
                          <option value="business">עסקים</option>
                          <option value="regular">רגיל</option>
                          <option value="education">השכלה</option>
                          <option value="other">אחר</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input type="text" id="amount" className="text-right" value={AddCommaToNumber(editedSaving.amount)} onChange={(e) => handleEditChange(e, 'amount')} />
                      </td>
                      <td className="p-2">
                        <input type="text" id="interest" className="text-right" value={AddCommaToNumber(editedSaving.interest)} onChange={(e) => handleEditChange(e, 'interest')} />
                      </td>
                      <td className="p-2">
                        <input type="text" id="total_saving_amount" className="text-right bg-gray-200" value={AddCommaToNumber(parseFloat(editedSaving.total_saving_amount))} disabled />
                      </td>
                      <td className="p-2">
                        <input type="text" id="starting_date" className="text-right" value={editedSaving.starting_date} onChange={(e) => handleEditChange(e, 'starting_date')} />
                      </td>
                      <td className="p-2">
                        <input type="text" id="finish_date" className="text-right" value={editedSaving.finish_date} onChange={(e) => handleEditChange(e, 'finish_date')} />
                      </td>
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div className="space-x-1">
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
                            className="text-rose-500 hover:text-rose-600 square-full"
                            onClick={cancelEdit}
                          >
                            <span className="sr-only">Cancel</span>
                            <svg className="w-10 h-6 fill-current" viewBox="0 0 32 32">
                              <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm7 19a1 1 0 0 1-1.414 1.414L16 17.414l-5.586 5.586A1 1 0 0 1 9 21.586l5.586-5.586L9 10.414A1 1 0 0 1 10.414 9l5.586 5.586 5.586-5.586A1 1 0 0 1 23 10.414l-5.586 5.586Z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        <div className="text-right">{saving.saving_type}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-right">{AddCommaToNumber(saving.amount)}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-right">{saving.interest}%</div>
                      </td>
                      <td className="p-2">
                        <div className="text-right">{AddCommaToNumber(saving.total_saving_amount)}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-right">{new Date(saving.starting_date).toLocaleDateString()}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-right">{new Date(saving.finish_date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div className="space-x-1">
                          <button
                            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                            onClick={() => {
                              startEdit(saving);
                            }}
                          >
                            <span className="sr-only">Edit</span>
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                            </svg>
                          </button>
                          <button
                            className="text-rose-500 hover:text-rose-600 rounded-full"
                            onClick={() => deleteSaving(saving.id, token)}
                          >
                            <span className="sr-only">Delete</span>
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-2 text-center">
                  אין חסכונות להצגה
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SavingsTable;

