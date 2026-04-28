import express from "express";
import connection from "../server.js";

const router = express.Router();

router.post("/newcase", (req, res) => {
  const { userID, caseID = 1 } = req.body;

  if (!userID) {
    return res.status(400).json({ message: "User ID required" });
  }

  const getCaseDataQuery = "SELECT * FROM gamedb.case WHERE caseID = ?";
  connection.query(getCaseDataQuery, [caseID], (err, caseData) => {
    if (err) {
      console.error("Error querying the case table:", err);
      return res.status(500).json({ message: "Database query error" });
    }

    if (caseData.length === 0) {
      return res.status(400).json({ message: "Invalid case ID" });
    }

    const { name, description, culprit } = caseData[0];

    const insertCaseLogCaseQuery = `
      INSERT INTO gamedb.caselog_case (name, description, culprit, accept_status, solve_status, reward_status) 
      VALUES (?, ?, ?, 1, 0, NULL)
      ON DUPLICATE KEY UPDATE caselog_caseID = LAST_INSERT_ID(caselog_caseID)
    `;
    connection.query(
      insertCaseLogCaseQuery,
      [name, description, culprit],
      (err, result) => {
        if (err) {
          console.error("Error inserting into the caselog_case:", err);
          return res.status(500).json({ message: "Database insert error" });
        }

        const caselog_caseID = result.insertId;

        const updateUserCaseIDQuery = "UPDATE gamedb.user SET caseID = ? WHERE userID = ?";
        connection.query(updateUserCaseIDQuery, [caseID, userID], (err) => {
          if (err) {
            console.error("Error updating user case ID:", err);
            return res.status(500).json({ message: "Database update error" });
          }

          const updateCaseLogQuery = `
            INSERT INTO gamedb.caselog (userID, caselog_caseID)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE caselog_caseID = ?
          `;
          connection.query(updateCaseLogQuery, [userID, caselog_caseID, caselog_caseID], (err) => {
            if (err) {
              console.error("Error updating the caselog:", err);
              return res.status(500).json({ message: "Database update error" });
            }

            return res.status(201).json({ message: "Case accepted successfully" });
          });
        });
      }
    );
  });
});

export default router;