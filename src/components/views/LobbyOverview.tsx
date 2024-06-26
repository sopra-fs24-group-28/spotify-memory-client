import React, { useEffect, useState } from "react";
import { Spinner } from "../ui/Spinner";
import "styles/views/LobbyOverview.scss";
import { useNavigate } from "react-router-dom";
import LobbyObject from "../ui/LobbyObject";
import { Button } from "../ui/Button";
import WSHandler from "helpers/wsHandler";
import Lobby from "models/Lobby";
import toastNotify from "../../helpers/Toast";


const LobbyOverview = () => {
  const navigate = useNavigate();
  const [receivedGameStates, setReceivedGameStates] = useState<Lobby[]>([]);

  // creating stomp client
  const restEndpoint = "/games"; //todo change to games
  const wsEndpoint = "/topic/overview";
  const wsDestination = "/app/overview";
  const receiverFunction = (newDataRaw) => {
    const data = JSON.parse(newDataRaw.body).gameMap
    const key = Object.keys(data)?.[0]
    const update = data[key];
    const updatedLobbies = [];
    let makeNewLobby = true;
    setReceivedGameStates(prevState => {

      for (const lobbyKey in prevState) {
        const lobby = prevState[lobbyKey];
        // case 0: append all unaffedcted lobbies to list
        if (lobby.lobbyId !== key) {
          updatedLobbies.push(lobby);
        } else {
          // case 1: lobby closed
          if (update.gameState?.changed && update.gameState?.value === "FINISHED") {
            makeNewLobby = false;
            continue;
          } else {
            makeNewLobby = false;

            if (update.gameParameters.changed) {
              lobby.setGameParameters(update.gameParameters.value);
            }
            if (update.playerList.changed) {
              lobby.setPlayerList(update.playerList.value);
            }
            if (update.gameState.changed) {
              lobby.setGameState(update.gameState.value);
            }
            if (update.hostId.changed) {
              lobby.setHostId(update.hostId.value);
            }
            updatedLobbies.push(lobby)

          }
        }

      }
      // case 3: new lobby created
      if (makeNewLobby && update.gameParameters.value && update.playerList.value && update.gameState.value && update.hostId.value) {
        const newLobby = new Lobby(key, {});
        newLobby.setGameParameters(update.gameParameters.value);
        newLobby.setPlayerList(update.playerList.value);
        newLobby.setGameState(update.gameState.value);
        newLobby.setHostId(update.hostId.value);
        updatedLobbies.push(newLobby);
      }

      return updatedLobbies;
    })


  };
  

  const wsHandler = new WSHandler(restEndpoint, wsEndpoint, wsDestination, receiverFunction);


  useEffect(() => {
    const fetchData = async () => {
      // Perform asynchronous operation to fetch initial data
      const data = await wsHandler.fetchData();
      setReceivedGameStates(data); // this displays the data
      wsHandler.connect()
    };
    fetchData();
    

    return () => {
      wsHandler.disconnect();
    };
  }, []);

  
  function createlobby() {
    navigate("/customizeGame");
  }

  let content = <Spinner />;
   
  if (receivedGameStates?.filter(lobby => lobby.gameState === "OPEN").length > 0) {
    content = (
      <div className="gridhandler">
        {receivedGameStates.filter(lobby => lobby.gameState === "OPEN").map(lobby => (
          <div key={lobby.lobbyId} className="grid-item">
            <LobbyObject lobby={lobby} />
          </div>
        ))}
      </div>
    );    
  } else {
    content = (
      <div className="befirst">
        <h2>Be the first to start a game!</h2>
      </div>
    )
  }

  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div>
        <div className="newGameButton">
          <Button width={"40%"} height={"30%"} className={"create-lobby"} onClick={createlobby}>Create new Lobby</Button>
        </div>
        {content}
      </div>
    </div>
  </div>);

};

export default LobbyOverview;
