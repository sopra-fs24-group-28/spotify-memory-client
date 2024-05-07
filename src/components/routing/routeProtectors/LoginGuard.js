import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../../helpers/auth/logoutfunction";
import toastNotify from "../../../helpers/Toast";

/**
 *
 * Another way to export directly your functional component is to write 'export const'
 * instead of 'export default' at the end of the file.
 */
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
