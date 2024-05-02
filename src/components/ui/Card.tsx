import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "styles/views/GameScreen.scss";


export default function Card(props) {
  let clsName = "card card-back";

  if(props.cardobj.cardState === "FACEUP"){
    clsName = "card flipped"
  }else if(props.cardobj.cardState === "EXCLUDED"){
    clsName = "card excluded"
  }

  let card: any;

  if ((props.cardobj.cardState === "FACEDOWN")) {
    card = <div className={clsName} onClick={props.flip}>
      <div className="card-inner">
        <div className={"card-front"}>{props.content}</div>
      </div>
    </div>;
  } else {
    card = <div className={clsName} onClick={props.flip}>
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
