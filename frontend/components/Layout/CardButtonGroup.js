import React from 'react';
import { Box, Button, ButtonGroup, styled } from '@mui/material';

const StyledButtonGroup = styled(ButtonGroup)({
  width: "100%",
  '& .MuiButton-root': {
    flex: 1,
    color: '#feefce',
    backgroundColor: '#1f333c',
    border: '3px solid #b04b3e',
    '&:hover': {
      backgroundColor: '#942a1c',
    },
    '&:active': {
      backgroundColor: '#a6895a',
    },
    '&:first-of-type': {
      borderRight: `1px solid #3a4e4e`,
    },
    '&:last-of-type': {
      borderLeft: `1px solid #3a4e4e`,
    },
  },
});

const CardButtonGroup = ({ buttons }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <StyledButtonGroup variant="contained" aria-label="Basic button group">
        {buttons.map((button, index) => (
          <Button key={index} href={button.href}>{button.text}</Button>
        ))}
      </StyledButtonGroup>
    </Box>
  );
};

export default CardButtonGroup;