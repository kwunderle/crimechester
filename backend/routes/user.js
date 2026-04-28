import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../dbConnection.js";
import verifyUser from "../verify.js";

const router = express.Router();

router.get('/userdata', verifyUser, (req, res) => {
    const name = req.name;
    const userQuery = 'SELECT * FROM gamedb.user WHERE name = ?';
    connection.query(userQuery, [name], (err, data) => {
      if (err) {
        return res.json({ message: 'Server Side Error' });
      }
      if (data.length > 0) {
        return res.json({ Status: "Success", user: data[0] });
      }
      return res.json({ message: 'User not found' });
    });
  });

export default router;