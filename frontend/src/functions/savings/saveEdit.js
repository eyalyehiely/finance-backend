import axios from 'axios';
import swal from 'sweetalert'

export default function saveEdit(token, editedSaving, editingSavingId, setSavings) {
    if (!editedSaving || !token || !editingSavingId) {
      console.error('Invalid input to saveEdit:', { editedSaving, token, editingSavingId });
      return;
    }
    const editedData = {
    saving_type : editedSaving.saving_type || '',
    interest : editedSaving.interest || '',
    amount : editedSaving.amount ? String(editedSaving.amount).replace(/,/g, '') : '',    
    starting_date : editedSaving.starting_date || '',
    finish_date : editedSaving.finish_date || '',
    }
    axios.put(`http://localhost:8000/api/edit_saving/${editingSavingId}/`, editedData, {
    
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

    }).then(response => {
        if (response.data.status === 200) {
          swal({
            title: "💰!עבודה טובה",
            text: " !חסכון עודכן בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(()=>{
          // Upstarting_date the savings list with the returned saving data
          setSavings(savings.map(saving => saving.id === editingSavingId ? response.data.saving : saving));

          window.location.reload()
          })
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
          text: {"!שגיאת BACKEND":response.data.message},
          icon: "warning",
          button: "אישור",
        })
      });
  }