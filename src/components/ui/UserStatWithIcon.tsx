import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/UserStatWithIcon.scss";
import ProfileCircle from "./ProfileCircle";

export const UserStatWithIcon = (props) => (
  <span className="userbox">
    <ProfileCircle width={"35%"} height={"80%"}></ProfileCircle>
    <span className="button-label">{props.username}</span>
    <span className="notification-bubble">{props.currentStanding}</span>
  </span>);


UserStatWithIcon.propTypes = {
  username: PropTypes.string,
  currentStanding: PropTypes.string,
};
