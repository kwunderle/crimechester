import express from "express";
import bcrypt from "bcrypt";
import { connection } from "../dbConnection.js"

const router = express.Router();

router.post("/register", (req, res) => {
  const { user, pwd, classID: userClass } = req.body;

  if (!user || !pwd || !userClass) {
    return res
      .status(400)
      .json({ message: "Username, password, and class required" });
  }

  const checkUserQuery = "SELECT * FROM gamedb.user WHERE name = ?";
  connection.query(checkUserQuery, [user], (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ message: "Database query error" });
    }

    if (data.length > 0) {
      return res.status(409).json({ message: "Username taken" });
    }

    const getClassStatsQuery = "SELECT * FROM gamedb.class WHERE classID = ?";
    connection.query(getClassStatsQuery, [userClass], async (err, classData) => {
      if (err) {
        console.error("Error querying the class table:", err);
        return res.status(500).json({ message: "Database query error" });
      }

      if (classData.length === 0) {
        return res.status(400).json({ message: "Invalid class ID" });
      }

      const { charBase, endureBase, intBase, stealthBase, strengthBase, avatar: classAvatar, office: classOffice } = classData[0];

      const defaultRole = "user";
      const defaultRank = 1;

      // Hash the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      const insertUserQuery = `INSERT INTO gamedb.user (name, password, role, classID, charisma, endurance, intelligence, stealth, strength, \`rank\`, avatar, office) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(
        insertUserQuery,
        [
          user,
          hashedPwd,
          defaultRole,
          userClass,
          charBase,
          endureBase,
          intBase,
          stealthBase,
          strengthBase,
          defaultRank,
          classAvatar,
          classOffice,
        ],
        (err, data) => {
          if (err) {
            console.error("Error inserting into the database:", err);
            return res.status(500).json({ message: "Database insert error" });
          }

          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    });
  });
});

export default router;