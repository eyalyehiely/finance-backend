
import axios from '../axiosConfig'
import swal from 'sweetalert';

export default function fetchDebtData(token,setDebts) {
    axios.post('/debts/get_all_debts/', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        setDebts(response.data.all_debts);

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
        text: "An error occurred while fetching data.",
        icon: "warning",
        button: "אישור",
      });
    });
  }