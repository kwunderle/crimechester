import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from './AuthProvider'; "./AuthProvider.js";
import Login from "../../src/pages/Login";
import Welcome from '../../src/pages/Welcome';
import Unauthorized from '../../src/pages/Unathorized';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const isLoggedIn = auth?.user
  const hasRequiredRole = isLoggedIn && allowedRoles.includes(auth.role);

  console.log('isLoggedIn:', isLoggedIn);
  console.log('hasRequiredRole:', hasRequiredRole);

  if (!isLoggedIn) {
    return <Welcome/>
  }

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />
};

export default RequireAuth;