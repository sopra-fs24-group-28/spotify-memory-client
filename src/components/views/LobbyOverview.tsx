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
  const [receivedGameStates, setReceivedGameStates] = useState<Lobby[]>([]);

  // creating stomp client
  const restEndpoint = "/games"; //todo change to games
  const wsEndpoint = "/topic/overview";
  const wsDestination = "/app/overview";
  const receiverFunction = (newDataRaw) => {
    const data = JSON.parse(newDataRaw.body).gameMap
    const key = Object.keys(data)?.[0]
    const update = data[key];
    console.log(update);
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
            continue;
          }
        }

      }
      // case 3: new lobby created
      if (makeNewLobby) {
        const newLobby = new Lobby(key, {});
        console.log("making a new lobby");
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
    console.log("receivedGameState updated")
    console.log(receivedGameStates);
  }, [receivedGameStates]);

  useEffect(() => {
    const fetchData = async () => {
      // Perform asynchronous operation to fetch initial data
      // TODO: remove fetchData from class into here
      const data = await wsHandler.fetchData();
      setReceivedGameStates(data); // this displays the data
      wsHandler.connect()
    };
    console.log("REST ENDPOINT CALLED!!!!!!!!!!!!!!!!!!!!!!!!!");
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
   
  if (receivedGameStates?.length > 0) {
    content = (
      <div className="gridhandler">
      {receivedGameStates.map((lobby: Lobby) => (
        <div key={lobby.id} className="grid-item">
          <LobbyObject lobby={lobby}   />
        </div>
      ))}
      </div>
    )
  } else {
    content = (
      <div className="befirst">
        Be the first to start a game!
      </div>
    )
  }

  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div>
        <div className="newGameButton">
          <Button width={"40%"} height={"30%"} className={"primary-button"} onClick={createlobby}>Create new Lobby</Button>
        </div>
        {content}
      </div>
    </div>
  </div>);

};

export default LobbyOverview;
