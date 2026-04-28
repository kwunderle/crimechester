import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from '../../src/API';  // Adjust the import according to your project structure

const ACTIVE_URL = '/activecase';
const NEXT_URL = '/nextcase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CaseButtonGroup = ({ buttons }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        {buttons && buttons.map((button, index) => (
          <Button key={index} onClick={() => handleModalOpen(button.text)}>
            {button.text}
          </Button>
        ))}
      </ButtonGroup>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalContent}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent === 'Solve the Case' ? 'Details about solving the case.' :
              modalContent === 'Give up?' ? 'Are you sure you want to give up?' :
              modalContent.startsWith('Case Title:') ? 'Details about the case.' :
              'Do you want to accept this case?'}
          </Typography>
          <Button onClick={handleModalClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

CaseButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default CaseButtonGroup;