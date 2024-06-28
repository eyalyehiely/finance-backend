import axios from '../axiosConfig'
import getCreditCardData from './getCreditCardData';

export default function updateCreditCard(token, setCreditCards, editingCardId, data, handleClose) {
  axios.put(`cards/edit_card/${editingCardId}/`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: 'Success!',
          text: 'כרטיס התעדכן בהצלחה!',
          icon: 'success',
          button: 'אישור',
        }).then(()=>{
          getCreditCardData(token, setCreditCards);
          window.location.reload()
          handleClose();
        })
       
      } else {
        console.log('Error:', response.data.message);
        alert(response.data.message); // Adjust error handling as needed
      }
    })
    .catch(error => {
      console.error('שגיאה!', error);
      swal({
        title: 'שגיאה!',
        text: 'שגיאה בעדכון כרטיס האשראי!',
        icon: 'warning',
        button: 'אישור',
      });
    });
}
