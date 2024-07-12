import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Token needed" });
  } else {
    jwt.verify(token, "crimechester-jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

export default verifyUser;