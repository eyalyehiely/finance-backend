import axios from 'axios';

export default async function getAddress(setAddressResults) {
  try {
    const response = await axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba');
    setAddressResults(response.data.result.records);
  } catch (error) {
    console.error('Error fetching address data:', error);
    setAddressResults([]); // Set empty array or handle error state as needed
  }
}
