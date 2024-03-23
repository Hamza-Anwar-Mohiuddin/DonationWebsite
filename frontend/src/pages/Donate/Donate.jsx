// Donate.js
import { useState } from 'react';
import './Donate.css';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function Donate() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState(0);
  const [numPixels, setNumPixels] = useState('');
  const [isNumPixelFieldEnabled, setIsNumPixelFieldEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);


  const ClusterPixels = "Cluster Of Pixels"
  const OnePixel = "One Pixel"
  const FullFlag = "Full Flag"

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    // Toggle the selected state of the checkbox
    setSelectedOption(selectedOption === value ? '' : value);
    // Enable or disable the submit button based on the selected option
    setIsSubmitEnabled(selectedOption === value ? false : true);
  
    // Update amount and other state based on the selected option
    if (value === OnePixel) {
      setAmount(5);
    } else if (value === FullFlag) {
      setAmount(1000000 * 5);
    } else {
      setAmount(0);
    }
    if (value === ClusterPixels) {
      setIsNumPixelFieldEnabled(true);
    } else {
      setIsNumPixelFieldEnabled(false);
      setNumPixels('');
    }
  };

  const handleNumPixelsChange = (event) => {
    const numPixelsValue = parseInt(event.target.value);
    if (!isNaN(numPixelsValue) && numPixelsValue >= 0) {
      setNumPixels(numPixelsValue.toString());
      setAmount(numPixelsValue * 5);
    } else {
      setNumPixels('');
      setAmount(0);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsFormSubmitted(true);
    } else {
      alert("kindly select some value")
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
                        style={{ color: 'green' }}
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
                        value= {ClusterPixels}
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
                    disabled: !isNumPixelFieldEnabled,
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
          <Button  onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</Button>
          </div>
          
        </div>
      ) : (
        <div className='Donate-page-post-submit-form-parent-div'>
          <h4>Thankyou for your donation.</h4>
          <p>You are donating <span>{selectedOption}</span> and your bill is <span>{amount}$</span></p>
          <hr />
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
              <Button variant="contained" onClick={handleReturnToForm}>Submit</Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Donate;
