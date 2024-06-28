import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchDebtData from '/src/functions/debts/fetchDebtData.js';

export default function saveEdit(token, editedDebt, editingDebtId, setDebts) {
  if (!editedDebt || !token || !editingDebtId) {
    console.error('Invalid input to saveEdit:', { editedDebt, token, editingDebtId });
    return;
  }

  const editedData = {
    name: editedDebt.name || '',
    type: editedDebt.type || '',
    amount: editedDebt.amount ? String(editedDebt.amount).replace(/,/g, '') : '',
    interest: editedDebt.interest || '',
    estimate_total_amount: editedDebt.estimate_total_amount || '',
    starting_date: editedDebt.starting_date || '',
    finish_date: editedDebt.finish_date || '',
  };

  axios.put(`/debts/edit_debt/${editingDebtId}/`, editedData, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: "Success!",
          text: "Debt updated successfully!",
          icon: "success",
          button: "OK",
        });
        setDebts(debts => debts.map(debt => debt.id === editingDebtId ? response.data.debt : debt));
        fetchDebtData(token, setDebts);
        window.location.reload()
      } else {
        console.log('Error:', response.data.message);
        alert(response.data.message); // Adjust error handling as needed
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
      swal({
        title: "Ⅹ!שגיאה ",
        text: {"!שגיאת BACKEND":response.data.message},
        icon: "warning",
        button: "אישור",
      })
    });
}
