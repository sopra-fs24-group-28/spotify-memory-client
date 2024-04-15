import React, { useEffect, useState } from "react";
import { Spinner } from "../ui/Spinner";
import "styles/views/LobbyOverview.scss";
import { useNavigate } from "react-router-dom";
import LobbyObject from "../ui/LobbyObject";
import { Button } from "../ui/Button";
import WSHandler from "helpers/wsHandler";
import Lobby from "models/Lobby";


const LobbyOverview = () => {
  const navigate = useNavigate();
  
  // creating stomp client
  const restEndpoint = "/game";
  const wsEndpoint = "/topic/overview";
  const wsDestination = "/app/overview";
  const receiverFunction = (data) => {
    console.log(data); // TODO: update game state when ws receives updateDTO
    //setReceivedGameStates(data); // set received game state each time overview update dto is received
  };
  const wsHandler = new WSHandler(restEndpoint, wsEndpoint, wsDestination, receiverFunction);
  const [receivedGameStates, setReceivedGameStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ws something changed");
  }, [receivedGameStates]);

  useEffect(() => {
    const fetchData = async () => {
      // Perform asynchronous operation to fetch initial data
      const data = await wsHandler.fetchData();
      console.log(data);
      console.log("here");
      setReceivedGameStates(data);
      wsHandler.connect()
      setLoading(false);
    };

    fetchData();
    

    // Clean-up function
    return () => {
      // Perform any necessary clean-up
      wsHandler.disconnect();
    };
  }, []);

  

  function createlobby() {
    navigate("/customizeGame");
  }

  let content = <Spinner />;
   
  if (receivedGameStates.length > 0) {
    content = (
      <div className="gridhandler">
      {receivedGameStates.map((lobby: Lobby) => (
        <div key={lobby.id} className="grid-item">
          <LobbyObject lobby={lobby}   />
        </div>
      ))}
      </div>
    )
  } else if (receivedGameStates.length === 0) {
    content = (
      <div style={{"text-align": "center", "align-align": "middle", "line-height": "400px"}}>
        Be the first to start a game!
      </div>
    )
  }

  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div>
        <div className="newGameButton">
          <Button width={"45%"} height={"30%"} onClick={createlobby}>Create new Lobby</Button>
        </div>
        {content}
      </div>
    </div>
  </div>);

};

export default LobbyOverview;
