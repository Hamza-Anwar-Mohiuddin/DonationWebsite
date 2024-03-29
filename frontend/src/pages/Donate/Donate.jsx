import { useState } from 'react';
import './Donate.css';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function Donate() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState(0);
  const [numPixels, setNumPixels] = useState('2');
  const [isNumPixelFieldEnabled, setIsNumPixelFieldEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

  const ClusterPixels = "Cluster Of Pixels";
  const OnePixel = "One Pixel";
  const FullFlag = "Full Flag";

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOption(selectedOption === value ? '' : value);
    setIsSubmitEnabled(selectedOption === value ? false : true);

    if (value === OnePixel) {
      setAmount(5);
    } else if (value === FullFlag) {
      setAmount(1000000 * 5);
    } else if (value === ClusterPixels) {
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
      setAmount(2 * 5); // Defaulting to 2 pixels if invalid input
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsFormSubmitted(true);
    } else {
      alert("Kindly select some value");
    }
  };

  const handleSubmitform = () => {
    if (selectedOption && name && message) {
      let postData = {
        selectedOption: selectedOption,
        amount: amount,
        name: name,
        message: message
      };

      if (selectedOption === OnePixel) {
        postData.numPixels = 1;
      } else if (selectedOption === FullFlag) {
        postData.numPixels = 100;
      } else if (selectedOption === ClusterPixels) {
        postData.numPixels = numPixels;
      }

      setIsLoading(true); // Show loader when submitting form

      axios.post('http://localhost:3000/donate', postData)
        .then(response => {
          // Introduce a delay of 2 seconds before processing the response
          setTimeout(() => {
            setIsLoading(false); // Hide loading indicator

            if (response.status === 201) {
              console.log('Donation submitted successfully!');
              setIsFormSubmitted(true);

              // Hide loader and show alert
              // alert("Form submitted successfully!");
              setIsFormSubmitted(false);
              setTimeout(() => {
                setIsSubmitForm(false);
              }, 500);
            } else {
              throw new Error('Failed to submit donation');
            }
          }, 2000); // Adjust the delay time as needed
        })
        .catch(error => {
          setIsLoading(false); // Hide loading indicator if there's an error
          console.error('Error submitting donation:', error);
          alert('Failed to submit donation. Please try again.');
        });
    } else {
      alert("Kindly select some value");
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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}> {/* Show backdrop when loading */}
        <CircularProgress color="inherit" />
      </Backdrop>



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
                        value={OnePixel}
                        checked={selectedOption === OnePixel}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<span className={selectedOption !== OnePixel ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate One Pixel</span>}
                  />
                </FormGroup>
              </div>
              <div className='Donate-page-form-field'>
                <TextField
                  id={OnePixel}
                  label="Amount in USD"
                  value={selectedOption === OnePixel ? amount : ''}
                  InputProps={{
                    readOnly: true,
                    disabled: selectedOption !== OnePixel,
                    className: selectedOption !== OnePixel ? 'TextField-disabled' : ''
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
                        value={FullFlag}
                        checked={selectedOption === FullFlag}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<span className={selectedOption !== FullFlag ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Full Flag</span>}
                  />
                </FormGroup>
              </div>
              <div className='Donate-page-form-field'>
                <TextField
                  id={FullFlag}
                  label="Amount in USD"
                  value={selectedOption === FullFlag ? amount : ''}
                  InputProps={{
                    readOnly: true,
                    disabled: selectedOption !== FullFlag,
                    className: selectedOption !== FullFlag ? 'TextField-disabled' : ''
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
                        value={ClusterPixels}
                        checked={selectedOption === ClusterPixels}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={<span className={selectedOption !== ClusterPixels ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Cluster of Pixels</span>}
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
                    disabled: selectedOption !== ClusterPixels,
                    className: selectedOption !== ClusterPixels ? 'TextField-disabled' : ''

                  }}
                />
              </div>
              <div className='Donate-page-form-field'>
                <TextField
                  id="ClusterPixels"
                  label="Amount in USD"
                  value={selectedOption === ClusterPixels ? amount : ''}
                  InputProps={{
                    readOnly: true,
                    disabled: selectedOption !== ClusterPixels,
                    className: selectedOption !== ClusterPixels ? 'TextField-disabled' : ''
                  }}
                />
              </div>
            </div>
          </div>
          <div className='Donate-page-form-submit'>
            <Button onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</Button>
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
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
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
            <div className="form-submit-form">
              <Button variant="contained" onClick={handleReturnToForm}>Return to Form</Button>
              <Button variant="contained" onClick={handleSubmitform}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Donate;
