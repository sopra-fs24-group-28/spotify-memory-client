import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import Player from "./Player";


export default function Card (props) {
  useEffect(() => {
    console.log(props.cardobj);
  }, []);

  let card: any;
  if ((props.isFlipped === "FACEDOWN")) {
    card = <div className={`card${props.isFlipped === "FACEUP" ? " flipped" : " card-back"}`} onClick={props.flip}>
      <div className="card-inner">
        <div className={"card-front"}>{props.content}</div>
      </div>
    </div>;
  } else {
    card = <div className={`card${props.isFlipped === "FACEUP" ? " flipped" : " card-back"}`} onClick={props.flip}>
      <div className="card-inner">
        <div className="albumcover">
          <img src="" alt="albumcover" />
        </div>
        <div className="songtitle">{props.cardobj.cardId}</div>
        <div className="artisttitle">DummyArtist</div>
      </div>
    </div>;
  }


  return (<>{card}</>);
}

Card.propTypes = {
  isFlipped: PropTypes.string, flip: PropTypes.func, content: PropTypes.string, cardobj: PropTypes.object


};
