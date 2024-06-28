import axios from '../axiosConfig'
import getCurrentUserData from './getCurrentUserData';

export default function updateUser(token, setUser, data, handleClose) {
  axios.put(`/auth/edit_user/`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: 'Success!',
          text: 'משתמש עודכן בהצלחה!',
          icon: 'success',
          button: 'אישור',
        }).then(()=>{
            getCurrentUserData(token, setUser);
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
        text: 'שגיאה בעדכון משתמש !',
        icon: 'warning',
        button: 'אישור',
      });
    });
}
