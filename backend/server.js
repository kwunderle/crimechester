import express from "express"
import { connection } from "./dbConnection.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import APIRoutes from './routes/index.js'

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

app.use('/', APIRoutes)

app.get("/", (req, res) => {
  console.log("connection success");
  return res.json({ Status: "Success" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default connection;
