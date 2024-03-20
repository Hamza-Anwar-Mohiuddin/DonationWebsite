import { useState } from 'react';
import './Donate.css';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Donate() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState(0);
  const [numPixels, setNumPixels] = useState('');
  const [isNumPixelFieldEnabled, setIsNumPixelFieldEnabled] = useState(false);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "1pixel") {
      setAmount(5); // $5 for 1 pixel
    } else if (value === "FullFlag") {
      setAmount(1000000 * 5);
    } else {
      setAmount(0);
    }
    if (value === "ClusterPixels") {
      setIsNumPixelFieldEnabled(true); // Enable numPixels field if ClusterPixels checkbox is selected
    } else {
      setIsNumPixelFieldEnabled(false); // Disable numPixels field if another checkbox is selected
      setNumPixels(''); // Reset numPixels value if another checkbox is selected
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
                      value="1pixel"
                      checked={selectedOption === "1pixel"} 
                      onChange={handleCheckboxChange} 
                    />
                  } 
                  label={<span className={selectedOption !== "1pixel" ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate One Pixel</span>} 
                />
              </FormGroup>
            </div>
            <div className='Donate-page-form-field'>
              <TextField
                id="1pixel"
                label="Amount in USD"
                value={selectedOption === "1pixel" ? amount : ''}
                InputProps={{
                  readOnly: true,
                  disabled: selectedOption !== "1pixel",
                  className: selectedOption !== "1pixel" ? 'TextField-disabled' : ''
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
                      value="FullFlag"
                      checked={selectedOption === "FullFlag"} 
                      onChange={handleCheckboxChange} 
                    />
                  } 
                  label={<span className={selectedOption !== "FullFlag" ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Full Flag</span>} 
                />
              </FormGroup>
            </div>
            <div className='Donate-page-form-field'>
              <TextField
                id="FullFlag"
                label="Amount in USD"
                value={selectedOption === "FullFlag" ? amount : ''}
                InputProps={{
                  readOnly: true,
                  disabled: selectedOption !== "FullFlag",
                  className: selectedOption !== "FullFlag" ? 'TextField-disabled' : ''
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
                      value="ClusterPixels"
                      checked={selectedOption === "ClusterPixels"} 
                      onChange={handleCheckboxChange} 
                    />
                  } 
                  label={<span className={selectedOption !== "ClusterPixels" ? 'checkbox-label-disabled' : 'checkbox-label'}>Donate Cluster of Pixels</span>} 
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
                  disabled: !isNumPixelFieldEnabled, // Fixed typo
                  className: selectedOption !== "ClusterPixels" ? 'TextField-disabled' : ''
                }}
              />
            </div>
            <div className='Donate-page-form-field'>
              <TextField
                id="ClusterPixels"
                label="Amount in USD"
                value={selectedOption === "ClusterPixels" ? amount : ''}
                InputProps={{
                  readOnly: true,
                  disabled: selectedOption !== "ClusterPixels",
                  className: selectedOption !== "ClusterPixels" ? 'TextField-disabled' : ''
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donate;
