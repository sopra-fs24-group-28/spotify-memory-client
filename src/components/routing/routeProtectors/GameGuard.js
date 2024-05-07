import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import toastNotify from "../../../helpers/Toast";

export const GameGuard = () => {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  }
  toastNotify("Please log in before trying to access this page", 1000, 'warning')
  return <Navigate to="/login" replace />;
};

GameGuard.propTypes = {
  children: PropTypes.node,
};
