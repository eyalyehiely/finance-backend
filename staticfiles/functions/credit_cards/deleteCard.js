import axios from '../axiosConfig'
import swal from 'sweetalert'
import getCreditCardData from './getCreditCardData';

export default function deleteCard(token,id) {
    swal({
      title: "האם אתה בטוח?",
      text: "ברגע שתלחץ על אישור לא יהיה ניתן לשחזר את המידע",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/cards/delete_credit_card/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          swal({
            title: "🗑️!כרטיס נמחק בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(() => { 
            getCreditCardData()
            window.location.reload();// Refresh the data after deletion
          });
        }).catch((error) => {
          console.error("Error deleting card:", error);
          swal({
            title: "שגיאת שרת",
            icon: "warning",
            button: "אישור",
          });
        });
      } else {
        swal("הנתונים שלך בטוחים");
      }
    });
  }