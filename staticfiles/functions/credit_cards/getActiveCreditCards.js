import axios from '../axiosConfig'
import swal from 'sweetalert';

export default function getActiveCreditCardData(token,setCreditCards) {
    axios.post('/cards/get_active_credit_card/', {},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => {
        if (response.data.status === 200) {
          setCreditCards(response.data.credit_cards);

        } else {
          console.log('Error:', response.data.message);
          swal({
            title: "Ⅹ!שגיאה ",
            text: {"!שגיאת frontend":response.data.message},
            icon: "warning",
            button: "אישור",
          })
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        swal({
          title: "Ⅹ!שגיאה ",
          text: "!שגיאת backend",
          icon: "warning",
          button: "אישור",
        })
      });
  }