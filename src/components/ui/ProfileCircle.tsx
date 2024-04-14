import React from "react";
import "styles/views/CustomizeGameParameter.scss";
import PropTypes from "prop-types";


const ProfileCircle = (props) => {
  const profilePictureStyles = {
    alignSelf: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    height: props.height !== null ? props.height : 200,
    width: props.width !== null ? props.width : 200,
    background: props.url ? `url(${props.url}) center/cover` : "black",
    border: "1px solid #D9D9D9",
    //filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))",
    borderRadius: "50%",
    marginRight: "3px" // Adjust margin to allow overlap
  };

  return (
    <div style={profilePictureStyles}></div>
  );

};


export default ProfileCircle;

ProfileCircle.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  url: PropTypes.string,
};
