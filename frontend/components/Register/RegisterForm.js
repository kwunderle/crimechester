import React, { useRef, useState } from "react";
import { Input, InputLabel, FormControl, Button } from "@mui/material";
import Box from "@mui/material/Box";
import axios from '../../src/API';

const URL = '/register';

const RegisterForm = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(user);
    console.log(pwd);
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      };
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <Box component="form" onSubmit={handleSumbit}>
        <section>
          <InputLabel htmlFor="username">Username:</InputLabel>
          <Input
            type="text"
            id="username"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="off"
            required
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoComplete="off"
            required
          />
        </section>
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </Box>
    </section>
  );
};

export default RegisterForm;
