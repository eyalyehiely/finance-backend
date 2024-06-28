import axios from '../axiosConfig'
import swal from 'sweetalert'
import fetchSavingsData from './fetchSavingsData';

export default function saveEdit(token, editedSaving, editingSavingsId, setSavings) {
    if (!editedSaving || !token || !editingSavingsId) {
      console.error('Invalid input to saveEdit:', { editedSaving, token, editingSavingsId });
      return;
    }
    const editedData = {
    saving_type : editedSaving.saving_type || '',
    interest : editedSaving.interest || '',
    amount : editedSaving.amount ? String(editedSaving.amount).replace(/,/g, '') : '',  
    total_amount : editedSaving.total_amount ? String(editedSaving.total_amount).replace(/,/g, '') : '',
    starting_date : editedSaving.starting_date || '',
    finish_date : editedSaving.finish_date || '',
    }
    axios.put(`/savings/edit_saving/${editingSavingsId}/`, editedData, {
    
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
          setSavings(savings=> savings.map(saving => saving.id === editingSavingsId ? response.data.saving : saving));
          fetchSavingsData(token,setSavings)
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