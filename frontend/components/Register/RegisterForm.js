import React, { useRef, useState, useEffect } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "../../src/API";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "../Login/LoginForm";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const URL = "/register";

const RegisterForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [userClass, setUserClass] = useState("Detective");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const valid1 = USER_REGEX.test(user);
    const valid2 = PWD_REGEX.test(pwd);
    if (!valid1 || !valid2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        URL,
        JSON.stringify({ user, pwd, classID: userClass }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
      setUserClass("Detective");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Box component="section">
          success!
          <LoginForm />
        </Box>
      ) : (
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSumbit}>
            <Box component="section">
              <InputLabel htmlFor="username">
                Username:
                <Typography
                  component="span"
                  className={validName ? "valid" : "hide"}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Typography>
                <Typography
                  component="span"
                  className={validName || !user ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Typography>
              </InputLabel>
              <Input
                type="text"
                id="username"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="off"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="useridnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <Typography
                component="p"
                id="useridnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 20 characters
                <br />
                Must start with a letter
                <br />
                Use letters, numbers, underscores, and hyphens.
              </Typography>
              <InputLabel htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </InputLabel>
              <Input
                type="password"
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="off"
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <Typography
                component="p"
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 20 characters
                <br />
                Must have uppercase and lowercase letters, a number, and a
                special character
                <br />
                Allowed special characters:{" "}
                <Typography component="span" aria-label="exclamation mark">
                  !
                </Typography>{" "}
                <Typography component="span" aria-label="at symbol">
                  @
                </Typography>{" "}
                <Typography component="span" aria-label="hashtag">
                  #
                </Typography>{" "}
                <Typography component="span" aria-label="dollar sign">
                  $
                </Typography>{" "}
                <Typography component="span" aria-label="percent">
                  %
                </Typography>
              </Typography>
              <InputLabel htmlFor="confirmpwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </InputLabel>
              <Input
                type="password"
                id="confirmpwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              ></Input>
              <Typography
                component="p"
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Passwords must match
              </Typography>
            </Box>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="custom-select-label">Class</InputLabel>
              <Select
                labelId="custom-select-label"
                id="custom-select"
                value={userClass}
                onChange={(e) => setUserClass(e.target.value)}
                input={<OutlinedInput label="Class" />}
              >
                <MenuItem value="Detective">Detective</MenuItem>
                <MenuItem value="Gumshoe">Gumshoe</MenuItem>
                <MenuItem value="Sleuth">Sleuth</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RegisterForm;
