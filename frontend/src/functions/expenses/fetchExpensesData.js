
import axios from '../axiosConfig'
import swal from 'sweetalert';

export default function fetchExpensesData(token,setExpenses) {
    axios.post('/expenses/get_all_expenses/', {}, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.data.status === 200) {
          setExpenses(response.data.all_expenses);
        } else {
          console.log('Error:', response.data.message);
          swal({
            title: "Error!",
            text: `Frontend Error: ${response.data.message}`,
            icon: "warning",
            button: "OK",
          });
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        swal({
          title: "Error!",
          text: `Backend Error: ${error.message}`,
          icon: "error",
          button: "OK",
        });
      });
  }