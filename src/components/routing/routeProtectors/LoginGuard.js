import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginGuard = () => {
  if (!localStorage.getItem("token")) {
    
    return <Outlet />;
  }
  localStorage.clear()
  
  return <Outlet/>;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};
