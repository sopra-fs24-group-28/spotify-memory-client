import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";
import GameIconSVG from "../../styles/iconpaths/GameIconSVG";

export const ButtonSVG = (props) => (
  <button
    {...props}
    style={{ width: props.width, ...props.style }}
    className={`primary-button ${props.className}`}
  > {props.text}
    <div className="iconContainer">
      <GameIconSVG className="test"></GameIconSVG>
    </div>

  </button>);


ButtonSVG.propTypes = {
  width: PropTypes.number, style: PropTypes.object, className: PropTypes.string, text: PropTypes.string,
};
