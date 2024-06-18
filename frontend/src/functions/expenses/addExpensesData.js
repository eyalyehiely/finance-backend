import axios from 'axios'
import swal from 'sweetalert';

export default function fetchExpensesData(token) {
    const payment_method = document.getElementById('payment_method').value;
    const expense_type = document.getElementById('expense_type').value;
    const date_and_time = document.getElementById('date_and_time').value;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const credit_card = document.getElementById('credit_card')?.value || '';

    axios.post('http://localhost:8000/api/expenses/add_expense/', {
      name: name,
      payment_method: payment_method,
      expense_type: expense_type,
      date_and_time: date_and_time,
      category: category,
      price: price,
      credit_card: credit_card,
    }, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      swal({
        title: "💰!עבודה טובה",
        text: " !הוצאה נוספה בהצלחה",
        icon: "success",
        button: "אישור",
      }).then(() => {
        window.location.href = '/expenses/all-expenses';
      });
    }).catch((error) => {
      console.error('Error:', error.response.data.message);
      swal({
        title: "Ⅹ!שגיאה ",
        text: "!שגיאת BACKEND",
        icon: "warning",
        button: "אישור",
      });
    });
  }