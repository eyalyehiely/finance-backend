import swal from 'sweetalert'
import axios from '../axiosConfig'
import fetchIncomesData from './fetchIncomesData';

export default function deleteIncome(id,token) {
    swal({
      title: "האם אתה בטוח?",
      text: "ברגע שתלחץ על אישור לא יהיה ניתן לשחזר את המידע",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/incomes/delete_income/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          swal({
            title: "🗑️!עבודה טובה",
            text: " !החוב נמחק בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(() => {
            window.location.reload()
            fetchIncomesData(token,setIncomes); // Refresh the data after deletion
           
          });
        }).catch((error) => {
          console.error("Error deleting income:", error);
          swal({
            title: "Ⅹ!שגיאה ",
            text: "An error occurred while deleting the income.",
            icon: "warning",
            button: "אישור",
          });
        });
      } else {
        swal("הנתונים שלך בטוחים");
      }
    });
  }