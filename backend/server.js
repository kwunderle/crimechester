import express from 'express';
import { connection } from './dbConnection.js';
import cors from 'cors';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
    console.log("connection success")
    return res.json({ Status: "Success" });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

export default connection;