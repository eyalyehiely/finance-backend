import axios from '../axiosConfig';
import swal from 'sweetalert';
import getCreditCardData from './getCreditCardData';

export default function addCreditCard(token, setCreditCards, data, handleClose) {
  axios.post('/cards/add_credit_card/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setCreditCards((prevCreditCards) => [...prevCreditCards, response.data]);
    swal({
      title: "💰!עבודה טובה",
      text: " !הכנסה נוספה בהצלחה",
      icon: "success",
      button: "אישור",
    }).then(() => {
      handleClose();
      window.location.reload()
      getCreditCardData(token, setCreditCards);
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
