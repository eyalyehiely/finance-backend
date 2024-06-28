
import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchIncomesData from './fetchIncomesData';

export default function saveEdit(token, editedIncome, editingIncomeId, setIncomes) {
  if (!editedIncome || !token || !editingIncomeId) {
    console.error('Invalid input to saveEdit:', { editedIncome, token, editingIncomeId });
    return;
  }
    const editedData = {
      source : editedIncome.source || '', 
      date :editedIncome.date || '',
      amount: editedIncome.amount ? String(editedIncome.amount).replace(/,/g, '') : '',
    };

    axios.put(`/incomes/edit_income/${editingIncomeId}/`,editedData, {
  
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

    }).then(response => {
        if (response.data.status === 200) {
          swal({
            title: "💰!עבודה טובה",
            text: " !הכנסה עודכנה בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(()=>{
          // Update the incomes list with the returned income data
          setIncomes(incomes=> incomes.map(income => income.id === editingIncomeId ? response.data.income : income));
          fetchIncomesData(token,setIncomes);
          window.location.reload()

          })
        } else {
          console.log('Error:', response.data.message);
          swal({
            title: "Ⅹ!שגיאה ",
            text: {"!שגיאת frontend":response.data.message},
            icon: "warning",
            button: "אישור",
          })
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
