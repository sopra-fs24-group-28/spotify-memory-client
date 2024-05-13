import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginGuard = () => {
  if (!localStorage.getItem("token")) {
    
    return <Outlet />;
  }
  localStorage.clear()
  
  return <Navigate to="/login" />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};
