import React, { useState, useEffect } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  
  // Use MUI's useScrollTrigger to determine when to show the button
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });
  
  useEffect(() => {
    setShowButton(trigger);
  }, [trigger]);
  
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <Zoom in={showButton}>
      <Fab
        color="primary"
        size="small"
        aria-label="scroll back to top"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTopButton;