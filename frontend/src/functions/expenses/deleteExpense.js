import axios from 'axios'
import swal from 'sweetalert';
import fetchExpensesData from './fetchExpensesData';

export default function deleteExpense(token,id) {
    swal({
      title: "האם אתה בטוח?",
      text: "ברגע שתלחץ על אישור לא יהיה ניתן לשחזר את המידע",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/api/delete_expense/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          swal({
            title: "🗑️!עבודה טובה",
            text: " !ההוצאה נמחק בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(() => {
            fetchExpensesData(token,setExpenses); // Refresh the data after deletion
            window.location.reload()
          });
        }).catch((error) => {
          console.error("Error deleting expense:", error);
          swal({
            title: "Ⅹ!שגיאה ",
            text: "שגיאת שרת!",
            icon: "warning",
            button: "אישור",
          });
        });
      } else {
        swal("הנתונים שלך בטוחים");
      }
    });
  }