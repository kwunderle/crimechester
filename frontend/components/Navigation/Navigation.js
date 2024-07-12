import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../src/API";
import AuthContext, { useAuth } from "../Auth/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  faHome,
  faMap,
  faBuilding,
  faInfoCircle,
  faSignInAlt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import StyledNavButton from './StyledNavButtons';

const tabs = [
  { label: "Home", icon: faHome, link: "/home" },
  { label: "Map", icon: faMap, link: "/map" },
  { label: "Office", icon: faBuilding, link: "/office" },
  { label: "About", icon: faInfoCircle, link: "/about" },
];

const Navigation = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
    <AppBar position="fixed" sx={{ height: '64px', m: 0, p: 0, top: 0, left: 0, right: 0 }}>
      <Toolbar sx={{ justifyContent: "space-around", padding: 0, margin: 0 }}>
        {tabs.map((tab) => (
          <StyledNavButton
            key={tab.label}
            component="a"
            href={tab.link}
            sx={{
              display: "flex",
              flexDirection: isMediumScreen ? "column" : "row",
              alignItems: "center",
              textAlign: "center",
              fontSize: "inherit",
              minWidth: 0,
              padding: isSmallScreen ? "10px" : "auto",
            }}
          >
            <FontAwesomeIcon
              icon={tab.icon}
              size={isSmallScreen ? "lg" : "1x"}
            />
            {isLargeScreen && (
              <Typography sx={{ marginLeft: 1 }}>
                {tab.label}
              </Typography>
            )}
            {isMediumScreen && (
              <Typography variant="caption">{tab.label}</Typography>
            )}
          </StyledNavButton>
        ))}
        <StyledNavButton
          onClick={auth.user ? handleLogout : null}
          component="a"
          href={!auth.user ? "/login" : null}
          sx={{
            display: "flex",
            flexDirection: isMediumScreen ? "column" : "row",
            alignItems: "center",
            textAlign: "center",
            fontSize: "inherit",
            minWidth: 0,
            padding: isSmallScreen ? "10px" : "auto",
          }}
        >
          <FontAwesomeIcon
            icon={auth.user ? faRightFromBracket : faSignInAlt}
            size={isSmallScreen ? "lg" : "1x"}
          />
          {isLargeScreen && (
            <Typography sx={{ marginLeft: 1 }}>
              {auth.user ? "Log Out" : "Log In / Sign Up"}
            </Typography>
          )}
          {isMediumScreen && (
            <Typography variant="caption">
              {auth.user ? "Log Out" : "Log In / Sign Up"}
            </Typography>
          )}
        </StyledNavButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
