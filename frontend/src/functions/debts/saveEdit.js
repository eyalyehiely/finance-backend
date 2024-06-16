import axios from 'axios'
import swal from 'sweetalert';

export default function saveEdit() {
    const updatedDebt = {
      ...editedDebt,
      // amount: parseFloat(editedDebt.amount.replace(/,/g, '')),
    };

    axios.put(`http://localhost:8000/api/edit_debt/${editingDebtId}/`, updatedDebt, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        swal({
          title: "החוב התעדכן בהצלחה ",
          icon: "success",
          button: "אישור",
        }).then(()=>{
          setDebts(debts.map(debt => debt.id === editingDebtId ? response.data.debt : debt));
          setEditingDebtId(null);
          fetchDebtData(token,setDebts);
          window.location.reload()
        })
        
      } else {
        console.log('Error:', response.data.message);
        swal({
          title: "Ⅹ!שגיאה ",
          text: response.data.message,
          icon: "warning",
          button: "אישור",
        });
      }
    }).catch(error => {
      console.error('There was an error!', error);
      swal({
        title: "Ⅹ!שגיאה ",
        text: "An error occurred while updating the debt.",
        icon: "warning",
        button: "אישור",
      });
    });
  }