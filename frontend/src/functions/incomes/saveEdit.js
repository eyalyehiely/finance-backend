export default function saveEdit() {
    const source = document.getElementById('source').value;
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value.replace(/,/g, ''); // Remove commas before saving
  
    axios.put(`http://localhost:8000/api/edit_income/${editingincomeId}/`, {
      source: source,
      date: date,
      amount: amount,
  },{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

    })
      .then(response => {
        if (response.data.status === 200) {
          swal({
            title: "💰!עבודה טובה",
            text: " !הכנסה עודכנה בהצלחה",
            icon: "success",
            button: "אישור",
          }).then(()=>{
          // Update the incomes list with the returned income data
          setIncomes(incomes.map(income => income.id === editingincomeId ? response.data.income : income));
          setEditingIncomesId(null);
          fetchIncomesData(token,setIncomes);
          location.href = '/incomes/all-incomes';
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
