import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/UserStatWithIcon.scss";
import ProfileCircle from "./ProfileCircle";

export const UserStatWithIcon = (props) => {
  const user = props.user;
  
  return (
  <span className="userbox">
  <span className="centered-column">
    <ProfileCircle width={"40px"} height={"40px"} url={user.profileImageUrl}></ProfileCircle>
  </span>

  <span className="button-label">{user.username}</span>
  {props.currentStanding > 0 && ( // Check if currentStanding is larger than 0
        <span className="notification-bubble">{props.currentStanding}</span>
      )}
  </span>);

  }

UserStatWithIcon.propTypes = {
    user: PropTypes.object,
    username: PropTypes.string,
    currentStanding: PropTypes.number
};
  
