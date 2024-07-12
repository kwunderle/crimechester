import express from "express";
import connection from "../server.js";
import verifyUser from "../verify.js";

const router = express.Router();

router.get('/caselog', (req, res) => {
    const allCasesQuery = "SELECT * FROM gamedb.case";
    connection.query(allCasesQuery, (err, result) => {
      if (err) return res.json({ Message: "Server Side Error" });
      return res.json(result);
    });
  });
  
  router.get('/activecase', verifyUser, (req, res) => {
    const userName = req.name;
  
    const userQuery = "SELECT caseID FROM gamedb.user WHERE name = ?";
    connection.query(userQuery, [userName], (err, userData) => {
      if (err) {
        console.error("Error querying the user table:", err);
        return res.status(500).json({ message: "Database query error" });
      }
  
      if (userData.length === 0 || !userData[0].caseID) {
        return res.status(404).json({ message: "No current case found for this user" });
      }
  
      const caseID = userData[0].caseID;
  
      const caseQuery = "SELECT * FROM gamedb.case WHERE caseID = ?";
      connection.query(caseQuery, [caseID], (err, caseData) => {
        if (err) {
          console.error("Error querying the case table:", err);
          return res.status(500).json({ message: "Database query error" });
        }
  
        if (caseData.length === 0) {
          return res.status(404).json({ message: "Case not found" });
        }
  
        return res.status(200).json({ status: 'Success', case: caseData[0] });
      });
    });
  });
  
  export default router;