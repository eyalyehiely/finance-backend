// import React, { useEffect } from "react";
// import axios from '../axiosConfig'

// function GetAddress() {
//     useEffect(() => {
//         axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=5')
//             .then(response => {
//                 response.data.result.records.forEach(data => {
//                     console.log(data["שם_ישוב"]); // Accessing the city name directly
//                 });
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     return null; // No need to render anything in this component
// }

// export default GetAddress;



import React, { useEffect } from "react";
import axios from "axios";

function GetAddress() {
    useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=5')
            .then(response => {
                const records = response.data.result.records;
                for (let i = 0; i < records.length; i++) {
                    console.log(records[i]["שם_ישוב"]); // Accessing the city name using index
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return null; // No need to render anything in this component
}

export default GetAddress;
