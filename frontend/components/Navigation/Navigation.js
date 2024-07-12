import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../src/API";
import AuthContext, { useAuth } from "../Auth/AuthProvider";

const Navigation = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth({});
          navigate("/login");
        } else {
          alert("Logout Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navigation;
