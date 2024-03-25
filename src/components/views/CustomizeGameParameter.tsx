import React from "react";
import "styles/views/CustomizeGameParameter.scss";
import { Button } from "../ui/Button";
import navbar from "../ui/Navbar";
import { useNavigate } from "react-router-dom";

const CustomizeGameParameter = () => {
  const navigate = useNavigate();

  function startgame() {
    //Todo: implement function that firstly validates the input and secondly sends the information to the backend
    navigate("/Game1")
  }

  return (<>
    <div className="BaseContainer">
      <div className="BaseDiv">

        <div className="title-section">
          <h2 className="h2-title">Customize your Game!</h2>
        </div>
        <div className="input-section">


          <input className="normalInput" value="Maximum Players">
          </input>

          <input className="normalInput" value="Number of Cards">
          </input>

          <input className="normalInput" value="somethingsometing">
          </input>

          <input className="normalInput" value="somethingsometing">
          </input>

          <input className="normalInput" value="somethingsometing">
          </input>
        </div>

        <div className="button-section">
          <hr />
          <Button
            width="50%"
            className="customizebtn"
            onClick={startgame}>Start Game</Button>
        </div>
      </div>
    </div>
  </>);
};
export default CustomizeGameParameter;
