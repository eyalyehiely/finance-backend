import axios from 'axios'
import swal from 'sweetalert';

export default function saveEdit() {
    const editedData = {
      payment_method: editedExpense.payment_method,
      date_and_time: editedExpense.date_and_time,
      name: editedExpense.name,
      price: editedExpense.price.replace(/,/g, ''), // Remove commas before saving
      credit_card: editedExpense.credit_card || '',
    };

    axios.put(`http://localhost:8000/api/edit_expense/${editingExpenseId}/`, editedData, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.data.status === 200) {
          swal({
            title: "Success!",
            text: "Expense updated successfully!",
            icon: "success",
            button: "OK",
          });
          setExpenses(expenses.map(expense => expense.id === editingExpenseId ? response.data.expense : expense));
          setEditingExpenseId(null);
          fetchExpensesData(token,setExpenses);
        } else {
          console.log('Error:', response.data.message);
          alert(response.data.message); // Adjust error handling as needed
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('An error occurred while updating the expense.'); // Adjust error handling as needed
      });
  }