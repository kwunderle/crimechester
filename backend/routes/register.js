import express from "express";
import { connection } from "../dbConnection.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const insertUserQuery = `INSERT INTO gamedb.user (name, password) VALUES (?, ?)`;
  connection.query(insertUserQuery, [user, pwd], (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.status(500).json({ message: "Database insert error" });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

export default router;
