import React from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unathorized";
import Missing from "./pages/Missing";
import Welcome from "./pages/Welcome";
import Map from "./pages/Map";
import Office from "./pages/Office";
import Police from "./pages/Police";
import Mansion from "./pages/Mansion";
import Ballroom from "./pages/Ballroom";
import Admin from "./pages/Admin";
import RequireAuth from "../components/Auth/RequireAuth";
import { Container, styled } from "@mui/material";

const ROLES = {
  User: "user",
  Admin: "admin",
};

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: "auto",
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "none",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "100%",
  },
}));

function App() {
  return (
    <>
      <Navigation />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Missing />} />
          <Route path="missing" element={<Missing />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
          >
            <Route path="home" element={<Home />} />
            <Route path="map" element={<Map />} />
            <Route path="office" element={<Office />} />
            <Route path="police" element={<Police />} />
            <Route path="mansion" element={<Mansion />} />
            <Route path="ballroom" element={<Ballroom />} />
          </Route>
        </Routes>
        </ContentContainer>
        
    </>
  );
}

export default App;
