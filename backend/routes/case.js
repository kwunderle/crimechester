import express from "express";
import connection from "../server.js";
import verifyUser from "../verify.js";

const router = express.Router();

router.get('/caselog', (req, res) => {
    const caseLogQuery = `
    SELECT 
      c.userID, 
      c.caseLogID, 
      cl.name, 
      cl.description, 
      cl.culprit, 
      cl.accept_status, 
      cl.solve_status, 
      cl.reward_status
    FROM 
      gamedb.caselog AS c
    JOIN 
      gamedb.caselog_case AS cl
    ON 
      c.caselog_caseID = cl.caselog_caseID
  `;
    connection.query(caseLogQuery, (err, result) => {
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
  

  // router.get('/nextcase', (req, res) => {
  //   const query = `
  //     SELECT * FROM gamedb.caselog_case 
  //     WHERE caselog_caseID NOT IN (
  //       SELECT caselog_caseID FROM gamedb.caselog WHERE accept_status = 1 OR solve_status = 1
  //     )
  //     ORDER BY caselog_caseID ASC LIMIT 1
  //   `;
  //   connection.query(query, (err, result) => {
  //     if (err) return res.json({ Status: "Error", Message: "Server Side Error" });
  //     if (result.length > 0) {
  //       return res.json({ Status: "Success", caseDetails: result[0] });
  //     } else {
  //       return res.json({ Status: "Success", caseDetails: null });
  //     }
  //   });
  // });  
  
  export default router;