import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorDisplay = ({ 
  message = 'An error occurred. Please try again later.',
  onRetry = null,
  fullPage = false 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        minHeight: fullPage ? 'calc(100vh - 200px)' : 'auto',
      }}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          maxWidth: 500,
          width: '100%',
          borderRadius: 2
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {message}
        </Typography>
        {onRetry && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onRetry}
            sx={{ mt: 1 }}
          >
            Try Again
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default ErrorDisplay;