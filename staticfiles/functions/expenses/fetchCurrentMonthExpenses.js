import axios from '../axiosConfig'


export default function fetchCurrentMonthExpenses(token,setExpenses) {
    // event.preventDefault();
    
    axios.post('/expenses/fetch_user_expenses/',{},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
  }).then(response => {
        if (response.data.status ===200) {
            console.log({'all_expenses':response.data.all_expenses});
            setExpenses(response.data.all_expenses); 
        } else {
            console.log('Error:', response.data.message);
            // alert(response.data.message);
        }
    })
    .catch(error => {
      console.error('There was an error!', error);
      // alert('An error occurred while fetching data.');
  });
}