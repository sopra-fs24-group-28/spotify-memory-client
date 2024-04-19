import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/UserStatWithIcon.scss";
import ProfileCircle from "./ProfileCircle";

export const UserStatWithIcon = (props) => (<span className="userbox">
  <span className="centered-column">
    <ProfileCircle width={"30px"} height={"30px"}></ProfileCircle>
  </span>

  <span className="button-label">{props.username}</span>
  <span className="notification-bubble">{props.currentStanding}</span>
  </span>);


UserStatWithIcon.propTypes = {
  username: PropTypes.string, currentStanding: PropTypes.string,
};
