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
import Admin from "./pages/Admin";
import RequireAuth from "../components/Auth/RequireAuth";

const ROLES = {
  User: "user",
  Admin: "admin",
};

function App() {
  return (
    <>
      <Navigation />
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
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
              <Route path="home" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
              <Route path="map" element={<Map />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
              <Route path="office" element={<Office />} />
            </Route>
      </Routes>
    </>
  );
}

export default App;