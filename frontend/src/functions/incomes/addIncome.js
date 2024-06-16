import axios from 'axios';
import swal from 'sweetalert'

export default function fetchIncome(token) {
    const source = document.getElementById('source').value
    const amount = document.getElementById('amount').value
    const date = document.getElementById('date').value;

    console.log(source,amount,date,);

    axios.post('http://localhost:8000/api/add_income/', {
      source:source,
      amount:amount,
      date:date,
    },{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      swal({
        title: "💰!עבודה טובה",
        text: " !הכנסה נוספה בהצלחה",
        icon: "success",
        button: "אישור",
      }).then(()=>{
      window.location.href = '/incomes/all-incomes'
      })
    }).catch((response) => {
      // console.log(response.data);
      swal({
        title: "Ⅹ!שגיאה ",
        text: {"!שגיאת שרת":response.data.message},
        icon: "warning",
        button: "אישור",
      })
    })
  }