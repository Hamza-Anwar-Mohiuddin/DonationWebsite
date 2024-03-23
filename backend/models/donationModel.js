// donationModel.js

const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.database);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

function submitDonation(name, message, selectedOption, amount, callback) {
  const sql = `INSERT INTO donations (name, description, type, amount) VALUES (?, ?, ?, ?)`;
  const values = [name, message, selectedOption, amount];

  connection.query(sql, values, callback);
}

function getDonors(callback) {
  const sql = `SELECT * FROM donations`;

  connection.query(sql, callback);
}

module.exports = {
  submitDonation,
  getDonors
};
