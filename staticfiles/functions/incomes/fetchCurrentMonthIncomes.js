import axios from '../axiosConfig'

export default function fetchIncomesData(token,setLoading,setIncomes,setError) {
  setLoading(true);
  axios.post('/incomes/fetch_user_incomes/',{},{
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      setLoading(false);
      if (response.data.status === 200) {
        setIncomes(response.data.month_revenues)
        
      } else {
        setError(response.data.message);
      }
    })
    .catch(error => {
      setLoading(false);
      setError('An error occurred while fetching data.');
      console.error('There was an error!', error);
    });
}