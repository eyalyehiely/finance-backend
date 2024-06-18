
import axios from 'axios';
import swal from 'sweetalert'
import getCreditCard from './getCreditCardData'

export default function addCreditCard(token) {
    const name = document.getElementById('name').value;
    const day_of_charge = document.getElementById('day_of_charge').value;
    const credit_type = document.getElementById('credit_type').value;
    const line_of_credit = document.getElementById('line_of_credit').value;
    const last_four_digits = document.getElementById('last_four_digits').value;
    const status = document.getElementById('status').value;
console.log( name, day_of_charge,
   credit_type,
   line_of_credit,
   last_four_digits,
  status,);
  
    axios.post('http://localhost:8000/api/cards/add_credit_card/', {
      name: name,
      day_of_charge: day_of_charge,
      credit_type: credit_type,
      line_of_credit: line_of_credit,
      last_four_digits: last_four_digits,
      status: status,
    }, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response.data);
      swal({
        title: "💳כרטיס נוסף בהצלחה!",
        icon: "success",
        button: "אישור",
      }).then(() => {
        getCreditCard(token)
        window.location.href = '/creditcards/all-cards';
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        swal({
          title: "שגיאה במערכת!",
          text: error.response.data.message || 'שגיאת שרת',
          icon: "warning",
          button: "אישור",
        });
      } else {
        console.error('No response from server:', error.request);
        swal({
          title: "שגיאה במערכת!",
          text: "אין תגובה מהשרת",
          icon: "warning",
          button: "אישור",
        });
      }
    });
  }