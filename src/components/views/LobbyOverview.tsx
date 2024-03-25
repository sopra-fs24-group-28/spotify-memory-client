import React from "react";
import "styles/views/LobbyOverview.scss";
import { useNavigate } from "react-router-dom";
import LobbyObject from "../ui/LobbyObject";
import { Button } from "../ui/Button";

const LobbyOverview = () => {
  const navigate = useNavigate();


  function doLogout() {
    //Todo: implement function that firstly validates the div and secondly sends the information to the backend
  }

  function doReturn() {
    navigate("/");
  }

  function createlobby(){
    //TODO: Logik implementieren
    navigate("/customizeGame")
  }


  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div className="gridhandler">
        <Button width={"80%"} height={"30%"} onClick={createlobby}>Create new Lobby</Button>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
      </div>
    </div>
  </div>);

};
export default LobbyOverview;
