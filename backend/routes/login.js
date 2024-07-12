import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connection } from "../dbConnection.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { name, password } = req.body;
  const userQuery = "SELECT * FROM gamedb.user WHERE name = ?";

  connection.query(userQuery, [name], (err, data) => {
    if (err) {
      return res.json({ Status: "Error", Message: "Server Side Error" });
    }

    if (data.length === 0) {
      return res.json({ Status: "Error", Message: "User not found" });
    }

    const user = data[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({ Status: "Error", Message: "Server Side Error" });
      }

      if (!result) {
        return res.json({ Status: "Error", Message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { name: user.name, role: user.role },
        "crimechester-jwt-secret-key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.json({ Status: "Success", user: user.name, role: user.role });
    });
  });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" });
  });

export default router;