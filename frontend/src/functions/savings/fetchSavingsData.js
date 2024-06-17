import axios from 'axios';
import swal from 'sweetalert';

export default function fetchSavingsData(token, setSavings) {
  axios.post('http://localhost:8000/api/get_all_savings/', {}, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        setSavings(response.data.all_savings);
      } else {
        console.log('Error:', response.data.message);
        swal({
          title: "שגיאה!",
          text: `שגיאת frontend: ${response.data.message}`,
          icon: "warning",
          button: "אישור",
        });
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
      swal({
        title: "שגיאה!",
        text: "שגיאת BACKEND",
        icon: "warning",
        button: "אישור",
      });
    });
}
