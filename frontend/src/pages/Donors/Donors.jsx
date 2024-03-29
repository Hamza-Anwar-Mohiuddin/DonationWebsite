import  { useState, useEffect } from 'react';
import axios from 'axios';
import './Donors.css';
function Donors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
 
    axios.get('http://localhost:3000/donors')
      .then(response => {
        setDonors(response.data);
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
      });
  }, []); 

  return (
    <div>
      <h2>Donors</h2>
      <table className="donors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.description}</td>
              <td>{donor.type}</td>
              <td>${donor.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Donors;
