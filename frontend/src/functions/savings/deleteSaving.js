import axios from 'axios';
import swal from 'sweetalert'

export default function deleteSaving(id) {
    swal({
      title: "האם אתה בטוח?",
      text: "ברגע שתלחץ על אישור לא יהיה ניתן לשחזר את המידע",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/api/delete_saving/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          swal({
            title: "🗑️!!החסכון נמחק בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(() => {
            fetchSavingsData(token,setSavings); // Refresh the data after deletion
          });
        }).catch((error) => {
          console.error("Error deleting saving:", error);
          swal({
            title: "Ⅹ!שגיאה ",
            text: "An error occurred while deleting the saving.",
            icon: "warning",
            button: "אישור",
          });
        });
      } else {
        swal("הנתונים שלך בטוחים");
      }
    });
  }