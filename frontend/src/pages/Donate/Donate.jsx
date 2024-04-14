import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donate.css';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Donate() {
  const [donationsClosed, setDonationsClosed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState(0);
  const [numPixels, setNumPixels] = useState('2');
  const [isNumPixelFieldEnabled, setIsNumPixelFieldEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/donationStatus')
      .then(response => {
        setDonationsClosed(response.data.donationsClosed);
      })
      .catch(error => {
        console.error('Error fetching donation status:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOption(selectedOption === value ? '' : value);
    setIsSubmitEnabled(selectedOption === value ? false : true);

    if (value === 'One Pixel') {
      setAmount(5);
    } else if (value === 'Full Flag') {
      setAmount(1000000 * 5);
    } else if (value === 'Cluster Of Pixels') {
      setIsNumPixelFieldEnabled(true);
      setAmount(numPixels * 5);
    } else {
      setIsNumPixelFieldEnabled(false);
      setAmount(0);
    }
  };

  const handleNumPixelsChange = (event) => {
    const numPixelsValue = parseInt(event.target.value);
    if (!isNaN(numPixelsValue) && numPixelsValue >= 2) {
      setNumPixels(numPixelsValue.toString());
      setAmount(numPixelsValue * 5);
    } else {
      setNumPixels('2');
      setAmount(2 * 5);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsFormSubmitted(true);
      setError('');
    } else {
      setError("Kindly select some value");
    }
  };

  const handleSubmitForm = () => {
    if (selectedOption && name && message) {
      const wordCount = message.trim().split(/\s+/).length;
      if (wordCount > 100) {
        setError("Message should not exceed 100 words.");
        return;
      }

      let postData = {
        selectedOption: selectedOption,
        amount: amount,
        name: name,
        message: message
      };

      if (selectedOption === 'One Pixel') {
        postData.numPixels = 1;
      } else if (selectedOption === 'Full Flag') {
        postData.numPixels = 100;
      } else if (selectedOption === 'Cluster Of Pixels') {
        postData.numPixels = numPixels;
      }

      setIsLoading(true);

      axios.post('http://localhost:3000/donate', postData)
        .then(response => {
          setTimeout(() => {
            setIsLoading(false);

            if (response.status === 201) {
              console.log('Donation submitted successfully!');
              setIsFormSubmitted(true);
              setIsFormSubmitted(false);
              setTimeout(() => {
                setIsSubmitForm(false);
              }, 500);
            } else {
              throw new Error('Failed to submit donation');
            }
          }, 2000);
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error submitting donation:', error);
          setError('Failed to submit donation. Please try again.');
        });
    } else {
      setError("Kindly select some value or fill in all fields.");
    }
  };

  const handleReturnToForm = () => {
    setIsFormSubmitted(false);
  };

  return (
    <>
      <div className='Donate-page-top-div'>
        <h1 className="Donate-main-heading">
          Donate Online
        </h1>
        <hr />
        <p>
          Your support has empowered us to transform the lives of countless talented and deserving individuals. Our team stands ready to assist you in directing your contribution. Regardless of your location, you can donate to NED today.
        </p>
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {!donationsClosed ? (
        <>
          {!isFormSubmitted ? (
            <div className='Donate-page-form-parent-div'>
              <h4>How would you like to help?</h4>
              <p>I want to contribute to: <span>(Select Option(s). As Required)</span></p>
              <hr />
              <div className='Donate-page-form'>
                <div className='Donate-page-form-field-div'>
                  <div className='Donate-page-form-field-text'>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: 'green' }}
                            value="One Pixel"
                            checked={selectedOption === 'One Pixel'}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={<span className={selectedOption !== 'One Pixel' ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate One Pixel</span>}
                      />
                    </FormGroup>
                  </div>
                  <div className='Donate-page-form-field'>
                    <TextField
                      id="OnePixel"
                      label="Amount in USD"
                      value={selectedOption === 'One Pixel' ? amount : ''}
                      InputProps={{
                        readOnly: true,
                        disabled: selectedOption !== 'One Pixel',
                        className: selectedOption !== 'One Pixel' ? 'TextField-disabled' : ''
                      }}
                    />
                  </div>
                </div>
                <div className='Donate-page-form-field-div'>
                  <div className='Donate-page-form-field-text'>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: 'green', fontSize: "4rem" }}
                            value="Full Flag"
                            checked={selectedOption === 'Full Flag'}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={<span className={selectedOption !== 'Full Flag' ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Full Flag</span>}
                      />
                    </FormGroup>
                  </div>
                  <div className='Donate-page-form-field'>
                    <TextField
                      id="FullFlag"
                      label="Amount in USD"
                      value={selectedOption === 'Full Flag' ? amount : ''}
                      InputProps={{
                        readOnly: true,
                        disabled: selectedOption !== 'Full Flag',
                        className: selectedOption !== 'Full Flag' ? 'TextField-disabled' : ''
                      }}
                    />
                  </div>
                </div>
                <div className='Donate-page-form-field-div'>
                  <div className='Donate-page-form-field-text'>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: 'green' }}
                            value="Cluster Of Pixels"
                            checked={selectedOption === 'Cluster Of Pixels'}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={<span className={selectedOption !== 'Cluster Of Pixels' ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Cluster of Pixels</span>}
                      />
                    </FormGroup>
                  </div>
                  <div className='Donate-page-form-field'>
                    <TextField
                      id="NumPixels"
                      label="Number of Pixels"
                      type="number"
                      value={numPixels}
                      onChange={handleNumPixelsChange}
                      InputProps={{
                        disabled: selectedOption !== 'Cluster Of Pixels',
                        className: selectedOption !== 'Cluster Of Pixels' ? 'TextField-disabled' : ''

                      }}
                    />
                  </div>
                  <div className='Donate-page-form-field'>
                    <TextField
                      id="ClusterPixels"
                      label="Amount in USD"
                      value={selectedOption === 'Cluster Of Pixels' ? amount : ''}
                      InputProps={{
                        readOnly: true,
                        disabled: selectedOption !== 'Cluster Of Pixels',
                        className: selectedOption !== 'Cluster Of Pixels' ? 'TextField-disabled' : ''
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='Donate-page-form-submit'>
                <Button style={{ fontSize: '80%' }} onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</Button>
              </div>
            </div>
          ) : (
            <div className='Donate-page-post-submit-form-parent-div'>
              <div className='receipt-section'>
                <h4 className='receipt-header'>Thank you for your donation.</h4>
                <div className="donation-details">
                  <p>You are donating <strong>{selectedOption}</strong></p>
                  <p>Your amount is <strong>{amount}$</strong></p>
                </div>
              </div>
              <div className='Donate-page-post-submit-form'>
                <TextField
                  style={{ width: '120%' }}
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  style={{ width: '120%' }}
                  id="message"
                  label={`Message (Up to 100 words${message.trim().length > 0 ? ` - ${message.trim().split(/\s+/).length}` : ''})`}
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    console.log(inputValue);
                    const wordCount = inputValue.trim().split(/\s+/).length;
                    setMessage(inputValue);
                    if (wordCount > 100) {
                      document.getElementById('message-label').style.color = 'red';
                    } else {
                      document.getElementById('message-label').style.color = 'inherit';
                    }
                  }}
                />
                {error && <div style={{ color: 'red' }}>
                  {error}
                </div>}
                <div className="form-submit-form">
                  <Button style={{ fontSize: '80%' }} variant="contained" onClick={handleReturnToForm}>Return to Form</Button>
                  <Button style={{ fontSize: '80%' }} variant="contained" onClick={handleSubmitForm}>Submit</Button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h3>Donations Closed</h3>
          <p>We have reached our donation goal. Thank you for your support!</p>
        </div>
      )}
    </>
  );
}

export default Donate;
