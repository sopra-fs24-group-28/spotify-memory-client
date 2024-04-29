import React from "react";
import PropTypes from "prop-types";
import "styles/views/GameScreen.scss";


export default function Card(props) {

  let card: any;
  if ((props.cardobj.cardState === "FACEDOWN")) {
    card = <div className={`card${props.cardobj.cardState === "FACEUP" ? " flipped" : " card-back"}`} onClick={props.flip}>
      <div className="card-inner">
        <div className={"card-front"}>{props.content}</div>
      </div>
    </div>;
  } else {
    card = <div className={`card${props.cardobj.cardState === "FACEUP" ? " flipped" : " card-back"}`} onClick={props.flip}>
      <div className="card-inner">
        {props?.cardobj?.content?.imageUrl !== null && props?.cardobj?.content?.imageUrl !== undefined &&
          <div className="albumcover">
            <img src={props.cardobj.content.imageUrl} alt="albumcover" />
          </div>
        }
        <div className="songtitle">{props.cardobj.cardState === "EXCLUDED" ? "" : props.cardobj.cardId}</div>
        {/*<div className="artisttitle">DummyArtist</div>*/}
      </div>
    </div>;
  }


  return (<>{card}</>);
}

Card.propTypes = {
  flip: PropTypes.func, content: PropTypes.string,
  cardobj: PropTypes.object,


};
