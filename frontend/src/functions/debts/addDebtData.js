import axios from 'axios'
import swal from 'sweetalert';

export default function fetchDebtData(token) {
  const name = document.getElementById('name').value
  const type = document.getElementById('type').value
  const amount = document.getElementById('amount').value;
  const line_of_debt = document.getElementById('line_of_debt').value
  const interest = document.getElementById('interest').value
  const starting_date = document.getElementById('starting_date').value;
  const finish_date = document.getElementById('finish_date').value;
    
    console.log(name, type, amount, line_of_debt, interest, finish_date, starting_date)

      axios.post('http://localhost:8000/api/add_debt/', {
        name: name,
        type: type,
        amount: amount,
        line_of_debt: line_of_debt,
        interest: interest,
        finish_date: finish_date,
        starting_date: starting_date,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log(response.data);
        swal({
          title: "💰!עבודה טובה",
          text: " !הוצאה נוספה בהצלחה",
          icon: "success",
          button: "אישור",
        }).then(() => {
          window.location.href = '/expenses/all-debts';
        });
      })
      .catch((error) => {
        console.error('There was an error!', error);
        swal({
          title: "Ⅹ!שגיאה ",
          text: {"!שגיאת מערכת": error.response.data.message},
          icon: "warning",
          button: "אישור",
        });
      });
      
  }