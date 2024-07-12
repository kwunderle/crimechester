import express from "express"
import { connection } from "../dbConnection.js"
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/register", (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const checkUserQuery = "SELECT * FROM gamedb.user WHERE name = ?";
  connection.query(checkUserQuery, [user], async (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ message: "Database query error" });
    }

    if (data.length > 0) {
      return res.status(409).json({ message: "Username taken" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);
    const defaultRole = "user";

    const insertUserQuery = `INSERT INTO gamedb.user (name, password, role) VALUES (?, ?, ?)`;
    connection.query(insertUserQuery, [user, hashedPwd, defaultRole], (err, data) => {
      if (err) {
        console.error("Error inserting into the database:", err);
        return res.status(500).json({ message: "Database insert error" });
      }
      return res.status(201).json({ message: "User registered successfully" });
    });
  });
});

export default router;