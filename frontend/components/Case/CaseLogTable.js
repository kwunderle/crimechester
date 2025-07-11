import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from '../../src/API';

const URL = '/caselog';

const CaseLogTable = () => {
  const [caseLogs, setCaseLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseLogs = async () => {
      try {
        const response = await axios.get(URL, { withCredentials: true });
        if (response.data) {
          setCaseLogs(response.data);
        }
      } catch (err) {
        setError('Failed to fetch case logs');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseLogs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Case Logs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Case Log ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Culprit</TableCell>
            <TableCell>Accept Status</TableCell>
            <TableCell>Solve Status</TableCell>
            <TableCell>Reward Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {caseLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.userID}</TableCell>
              <TableCell>{log.caseLogID}</TableCell>
              <TableCell>{log.name}</TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{log.culprit}</TableCell>
              <TableCell>{log.accept_status ? 'Accepted' : 'Not Accepted'}</TableCell>
              <TableCell>{log.solve_status ? 'Solved' : 'Unsolved'}</TableCell>
              <TableCell>{log.reward_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CaseLogTable;