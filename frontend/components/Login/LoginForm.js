import React, { useRef, useState, useEffect } from "react";
import { Input, InputLabel, FormControl, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "../../src/API";

const LoginForm = () => {
  const URL = "/login";
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          URL,
          { name: user, password: pwd },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/home");
          } else {
            alert(res.data.Message);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    console.log("success");
  };

  return (
    <Box component="section">
      <Typography
        component="p"
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </Typography>
      <Typography variant="h1" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box component="section">
          <FormControl>
            <InputLabel htmlFor="username">Username:</InputLabel>
            <Input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setUser(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password:</InputLabel>
            <Input
              type="password"
              id="password"
              value={pwd}
              autoComplete="off"
              required
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormControl>
        </Box>
        <Button variant="contained" type="submit">
          Log in
        </Button>
        <Typography component="p">Need an account?</Typography>
        <Button variant="contained" href="/register">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;