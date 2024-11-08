// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If user does not have the required role, show Not Found
    return <Navigate to="/not-found" />;
  }

  return children; // Render the children if authenticated and authorized
};

export default ProtectedRoute;
