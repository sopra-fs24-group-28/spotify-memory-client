import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../../helpers/auth/logoutfunction";
export const LoginGuard = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    return <Outlet />;
  }
  logout(navigate)
  return <Navigate to="/login" />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};
