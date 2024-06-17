
import axios from 'axios'
import swal from 'sweetalert';

export default function fetchDebtData(token,setSavings) {
    axios.post('http://localhost:8000/api/get_all_savings/', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        setSavings(response.data.all_savings);
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