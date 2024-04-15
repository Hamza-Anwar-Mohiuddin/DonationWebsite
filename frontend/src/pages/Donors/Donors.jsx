import { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './Donors.css';

function Donors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/donors');
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donors-container">
      <h2>Donors</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Pixels Donated</TableCell>
              <TableCell>Amount Donated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor, index) => (
              <TableRow key={index}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.description}</TableCell>
                <TableCell>{donor.amount.toFixed(2) / 5}</TableCell>
                <TableCell>${donor.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Donors;
