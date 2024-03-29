import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoaderWithLabel = ({ isLoading }) => {
  const label = isLoading ? 'Submitting...' : 'Submitted';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="secondary" />
      <Typography variant="body1" style={{ marginLeft: 10 }}>
        {label}
      </Typography>
    </div>
  );
};

export default LoaderWithLabel;
