import express from "express";
import { connection } from "./dbConnection.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import APIRoutes from "./routes/index.js";
import verifyUser from "./verify.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);

app.use("/", APIRoutes);

// app.get("/", verifyUser, (req, res) => {
//   console.log("API get / verifyuser data");
//   console.log(req);
//   return res.json({ Status: "Success", name: req.name });
// });

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
