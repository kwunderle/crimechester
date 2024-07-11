import express from 'express';
import { connection } from './dbConnection.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

export default connection;