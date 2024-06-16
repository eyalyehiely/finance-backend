import axios from 'axios';
import swal from 'sweetalert'

export default function addSaving(token) {
    const saving_type = document.getElementById('saving_type').value
    const interest = document.getElementById('interest').value
    const amount = document.getElementById('amount').value
    const starting_date = document.getElementById('starting_date').value;
    const finish_date = document.getElementById('finish_date').value;


    console.log(saving_type, interest, amount, starting_date, finish_date);

    axios.post('http://localhost:8000/api/add_saving/', {
      saving_type:saving_type,
      interest:interest,
      amount:amount,
      starting_date:starting_date,
      finish_date:finish_date,
    },{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      swal({
        title: "💰!עבודה טובה",
        text: " !חסכון נוסף בהצלחה",
        icon: "success",
        button: "אישור",
      }).then(()=>{
      window.location.href = '/incomes/all-savings'
      })
    }).catch((response) => {
      // console.log(response.data);
      swal({
        title: "Ⅹ!שגיאה ",
        text: {"!שגיאת BACKEND":response.data.message},
        icon: "warning",
        button: "אישור",
      })
    })
  }