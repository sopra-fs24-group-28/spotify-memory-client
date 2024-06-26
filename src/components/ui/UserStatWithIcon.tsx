import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/UserStatWithIcon.scss";
import ProfileCircle from "./ProfileCircle";

export const UserStatWithIcon = (props) => {
  const user = props.user;
  
  return (
  <span className={(Number(localStorage.getItem("userId")) === user.userId) ? "userbox-me" : "userbox"}>
  <span className="centered-column">
    <ProfileCircle width={"40px"} height={"40px"} url={user.imageUrl}></ProfileCircle>
  </span>

  <span className="button-label">{user.username}</span>
  {props.currentStanding > -1 && ( // Check if currentStanding is larger than 0
        <span className="notification-bubble">{props.currentStanding}</span>
      )}
  </span>);

  }

UserStatWithIcon.propTypes = {
    user: PropTypes.object,
    currentStanding: PropTypes.number
};
  
