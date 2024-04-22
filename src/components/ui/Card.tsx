import React from "react";
import PropTypes from "prop-types";
import "styles/views/Game.scss";


export default function Card (props) {

  let card: any;
  if (!props.isFlipped) {
    card = <div className={`card${props.isFlipped === "FACEDOWN" ? " flipped" : "greyed"}`} onClick={props.flip}>
      <div className="card-inner">
        <div className={"card-front"}>{props.content}</div>
      </div>
    </div>;
  } else {
    card = <div className={`card${props.isFlipped === "FACEDOWN" ? " flipped" : "greyed"}`} onClick={props.flip}>
      <div className="card-inner">
        <div className="albumcover">
          <img src="" alt="albumcover" />
        </div>
        <div className="songtitle">Song XY</div>
        <div className="artisttitle">DummyArtist</div>
      </div>
    </div>;
  }


  return (<>{card}</>);
}

Card.propTypes = {
  isFlipped: PropTypes.string, flip: PropTypes.func, content: PropTypes.string


};
