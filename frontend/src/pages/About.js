import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import CaseMapCard from '../../components/Map/CaseMapCard';
import axios from '../API';

const ACTIVE_URL = '/activecase';
const NEXT_URL = '/nextcase';

const About = () => {
  const [buttons, setButtons] = useState([]);
  const [activeCase, setActiveCase] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);

  const fetchActiveCase = async () => {
    try {
      const response = await axios.get(ACTIVE_URL, { withCredentials: true });
      if (response.data.Status === 'Success' && response.data.activeCase) {
        setActiveCase(response.data.activeCase);
      } else {
        fetchNextCase();
      }
    } catch (error) {
      console.error('Error fetching active case:', error);
    }
  };

  const fetchNextCase = async () => {
    try {
      const response = await axios.get(NEXT_URL, { withCredentials: true });
      if (response.data.Status === 'Success' && response.data.caseDetails) {
        setCaseDetails(response.data.caseDetails);
      }
    } catch (error) {
      console.error('Error fetching next case:', error);
    }
  };

  useEffect(() => {
    fetchActiveCase();
  }, []);

  useEffect(() => {
    if (activeCase) {
      setButtons([
        { text: 'Solve the Case', onClick: () => console.log('Solve the Case clicked') },
        { text: 'Give up?', onClick: () => console.log('Give up? clicked') }
      ]);
    } else if (caseDetails) {
      setButtons([
        { text: `Case Title: ${caseDetails.name}`, onClick: () => console.log(`Case Title: ${caseDetails.name} clicked`) },
        { text: 'Accept?', onClick: () => console.log('Accept? clicked') }
      ]);
    }
  }, [activeCase, caseDetails]);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Case Log
      </Typography>
      <CaseMapCard
        title={caseDetails ? caseDetails.name : "No active case"}
        image="https://via.placeholder.com/150"
        description={caseDetails ? caseDetails.description : "No case details available"}
        buttons={buttons}
      />
    </Container>
  );
};

export default About;