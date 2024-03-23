const donationModel = require('../models/donationModel');

function submitDonation(req, res) {
  try {
    const { name, message, selectedOption, amount } = req.body;

    donationModel.submitDonation(name, message, selectedOption, amount, (error, results, fields) => {
      if (error) {
        console.error('Error submitting donation:', error);
        res.status(500).json({ error: 'An error occurred while processing your donation.' });
        return;
      }

      res.status(201).json({ message: 'Donation submitted successfully!' });
    });
  } catch (error) {
    console.error('Error submitting donation:', error);
    res.status(500).json({ error: 'An error occurred while processing your donation.' });
  }
}

function getDonors(req, res) {
  try {
    donationModel.getDonors((error, results, fields) => {
      if (error) {
        console.error('Error fetching donors:', error);
        res.status(500).json({ error: 'An error occurred while fetching donors.' });
        return;
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'An error occurred while fetching donors.' });
  }
}

module.exports = {
  submitDonation,
  getDonors
};
