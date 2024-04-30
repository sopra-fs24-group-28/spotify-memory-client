import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "styles/views/GameScreen.scss";


export default function Card(props) {
  useEffect(() => {
    console.log(props);
  }, []);

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
        {props?.cardobj?.imageUrl !== null && props?.cardobj?.imageUrl !== undefined &&
          <div className="albumcover">
            <img src={props.cardobj.imageUrl} className="imgurl" alt="albumcover" />
          </div>
        }
        {/*<div className="songtitle">{props.cardobj.cardState === "EXCLUDED" ? "" : props.cardobj.cardId}</div>*/}
        {/*<div className="artisttitle">{props?.cardobj.imageUrl}</div>*/}
      </div>
    </div>;
  }


  return (<>{card}</>);
}

Card.propTypes = {
  flip: PropTypes.func, content: PropTypes.string,
  cardobj: PropTypes.object,


};
