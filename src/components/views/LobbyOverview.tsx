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
  const receiverFunction = (newData) => {
    const updatedLobbies = [];
    for (const key in newData) { 
      // TODO: currently assuming that closed lobbies will not be in newData, doulbe check with backend implementation
      const update = newData[key];
      const lobby = receivedGameStates.find(lobby => lobby.lobbyId === key);
      
      if (lobby) {
        if (update.gameParameters[0]) {
          lobby.setGameParameters(update.gameParameters[1]);
        }
        if (update.userList[0]) {
          lobby.setUserList(update.userList[1]);
        }
        if (update.gameState[0]) {
          lobby.setGameState(update.gameState[1]);
        }
        if (update.hostId[0]) {
          lobby.setHostId(update.hostId[1]);
        }
            
      } else {
        // creating new lobby if not already existing
        const lobby = new Lobby(key, {});
        lobby.setGameParameters(update.gameParameters[1]);
        lobby.setUserList(update.userList[1]);
        lobby.setGameState(update.gameState[1]);
        lobby.setHostId(update.hostId[1]);
      }
      updatedLobbies.push(lobby);
    }
    console.log(updatedLobbies);
    setReceivedGameStates(updatedLobbies); // set received game state each time overview update dto is received
};

  const wsHandler = new WSHandler(restEndpoint, wsEndpoint, wsDestination, receiverFunction);
  const [receivedGameStates, setReceivedGameStates] = useState([]);

  useEffect(() => {
    console.log("ws something changed");
  }, [receivedGameStates]);

  useEffect(() => {
    const fetchData = async () => {
      // Perform asynchronous operation to fetch initial data
      const data = await wsHandler.fetchData();
      console.log(data)
      setReceivedGameStates(data); // this displays the data
      console.log(data);
      wsHandler.connect()
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
