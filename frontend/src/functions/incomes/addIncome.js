import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchIncomesData from './fetchIncomesData';

export default function addIncome(token, setIncomes, data, handleClose) {
  axios.post('/incomes/add_income/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setIncomes((prevIncomes) => [...prevIncomes, response.data]);
    swal({
      title: "💰!עבודה טובה",
      text: " !הכנסה נוספה בהצלחה",
      icon: "success",
      button: "אישור",
    }).then(() => {
      handleClose();
      window.location.reload()
      fetchIncomesData(token, setIncomes);
    });
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!שגיאה ",
      icon: "warning",
      button: "אישור",
    });
  });
}
