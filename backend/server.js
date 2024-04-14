// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const donationController = require('./controllers/donationController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/donate', donationController.submitDonation);
app.get('/donors', donationController.getDonors); // New route for fetching donors
app.get('/donation/percentage', donationController.getDonationPercentage); 
app.get('/donationStatus', donationController.getDonationStatus);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
