import axios from 'axios';
import swal from 'sweetalert';
import fetchSavingsData from '/src/functions/savings/fetchSavingsData';

export default function addSaving(token) {
  // Capture input values
  const saving_type = document.getElementById('saving_type').value;
  const interest = document.getElementById('interest').value;
  const amount = document.getElementById('amount').value;
  const starting_date = document.getElementById('starting_date').value;
  const finish_date = document.getElementById('finish_date').value;

  // Log captured values (for debugging purposes)
  console.log(saving_type, interest, amount, starting_date, finish_date);

  // Send POST request to backend API
  axios.post('http://localhost:8000/api/savings/add_saving/', {
    saving_type: saving_type,
    interest: interest,
    amount: amount,
    starting_date: starting_date,
    finish_date: finish_date,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response) => {
    // Handle success response
    console.log(response.data);
    swal({
      title: "💰 עבודה טובה!",
      text: "חסכון נוסף נוסף בהצלחה!",
      icon: "success",
      button: "אישור",
    }).then(() => {
      // Redirect to savings page after successful addition
      window.location.href = '/incomes/all-savings';
      fetchSavingsData(token); // Ensure to fetch updated savings data after addition
    });
  })
  .catch((error) => {
    // Handle error response
    console.error('Error:', error);
    swal({
      title: "⚠ שגיאה!",
      text: "שגיאת בק אנד!",
      icon: "error",
      button: "אישור",
    });
  });
}
