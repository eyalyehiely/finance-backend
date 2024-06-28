import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchExpensesData from './fetchExpensesData';

export default function addExpensesData(token, setExpenses, data, handleClose) {
  axios.post('/expenses/add_expense/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    swal({
      title: "💰!עבודה טובה",
      text: " !הוצאה נוספה בהצלחה",
      icon: "success",
      button: "אישור",
    }).then(() => {
      handleClose();
      window.location.reload()
      fetchExpensesData(token,setExpenses)
     
    });
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!שגיאה ",
      text: "!שגיאת BACKEND",
      icon: "warning",
      button: "אישור",
    });
  });
}
