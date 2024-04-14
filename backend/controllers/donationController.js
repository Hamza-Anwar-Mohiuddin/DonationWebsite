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
function getDonationPercentage(req, res) {
  console.log('asfasf')
  donationModel.getTotalDonationAmount((error, totalAmount) => {
    if (error) {
      console.error('Error fetching total donation amount:', error);
      res.status(500).json({ error: 'An error occurred while fetching total donation amount.' });
      return;
    }

    try {
      const donationPercentage = totalAmount >= 5000000 ? 100 : (totalAmount / 5000000) * 100;
      res.status(200).json({ donationPercentage });
    } catch (error) {
      console.error('Error calculating donation percentage:', error);
      res.status(500).json({ error: 'An error occurred while calculating donation percentage.' });
    }
  });
}

function getDonationStatus(req, res) {
  donationModel.getTotalDonationAmount((error, totalAmount) => {
    if (error) {
      console.error('Error fetching total donation amount:', error);
      res.status(500).json({ error: 'An error occurred while fetching total donation amount.' });
      return;
    }

    try {
      if (totalAmount >= 5000000) {
        res.status(200).json({ donationsClosed: true });
      } else {
        const donationPercentage = (totalAmount / 5000000) * 100;
        res.status(200).json({ donationsClosed: false, donationPercentage });
      }
    } catch (error) {
      console.error('Error calculating donation status:', error);
      res.status(500).json({ error: 'An error occurred while calculating donation status.' });
    }
  });
}

module.exports = {
  submitDonation,
  getDonors,
  getDonationPercentage,getDonationStatus
};
