import axios from 'axios';
import swal from 'sweetalert';
import fetchSavingsData from './fetchSavingsData';

export default function addSaving(token, setSavings, data, handleClose) {
  axios.post('http://localhost:8000/api/savings/add_saving/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setSavings((prevSavings) => [...prevSavings, response.data]);
    swal({
      title: "💰!עבודה טובה",
      text: " !הכנסה נוספה בהצלחה",
      icon: "success",
      button: "אישור",
    }).then(() => {
      handleClose();
      window.location.reload()
      fetchSavingsData(token, setSavings);
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
