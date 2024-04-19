import React, { useEffect, useState } from "react";
import "styles/views/LobbyWaitingRoom.scss";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import SpotifyLogoWithTextSVG from "../ui/icons-svg/SpotifyLogoWithTextSVG";
import wsHandler from "../../helpers/wsHandler.js";
import Game from "./Game";


const LobbyWaitingRoom = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialGameId = location.state.lobby.lobbyId;
  const [game, setGame] = useState();



  //Websocket specific

  const receiverFunction = (newDataRaw) => {
    const parsedData = JSON.parse(newDataRaw.body).gameChangesDTO;
    const gameData = parsedData.game;

    if (gameData.changed) {
      setGame(prev => {
        return Game(gameData.value);
      });
    }
  };

  async function fetchData() {
    try {
      console.log(initialGameId);
      const response = await api.get(`/games/${initialGameId}`);
      const gameStart = response.data;
      setGame(Game(gameStart));
      return game;

    } catch (error) {
      console.error(`Something went wrong while fetching the Game: \n${handleError(error)}`);
    }
  }

  useEffect(() => {
    const fetchDataAndConnect = async () => {
      await fetchData();
      console.log("fetchDataAndConnect called");
      console.log(game);
      const ws = wsHandler(`/games/${game.gameId}`, `/queue/game/${game.gameId}`, `app/game/${game.gameId}`, receiverFunction);
      await ws.connect();
    };
    fetchDataAndConnect().catch(error => {alert('Something went wrong in the initialisation of the individual lobby. Please consult the admin')});

  }, []);

  useEffect(() => {
    console.log("game changed");
    console.log(game);
    if (game?.gameState === "ONPLAY"){
      navigate(`game/${game.gameId}`, { state: {ws: ws, gameId: game.gameId } })
    }
  }, [game]);


  //ComponentSpecific

  async function handleLeave() {

    // rest call that player delete request with
    try {
      const response = await api.delete(`games/${initialGameId}/player`);
      if (response.status === 204) {
        await ws.disconnect()
        navigate("/lobbyOverview"); //Todo: anpassen wenn klar wie

      } else {
        alert("There was a error when trying to leave the lobby. Please try again later");
      }

    } catch (error) {
      alert(`Something went wrong while trying to leave the lobby. \n${handleError(error)}`);
    }
  }

  function handleReady() {
    //TODO: send ready state via websocket connection:
  }

  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div className="gridhandler">
        <div className="centerwrapper">
          <div
            className={game?.gameParameters?.playlist?.images?.[0] ? "imgContainer" : "spotifyPlaylistContainer"}>
            {game?.gameParameters?.playlist?.images?.[0] ? (
              <img
                src={game.gameParameters.playlist.images[0]}
                alt="Spotify Playlist Image"
                width="85%"
                height="85%"
                className="img"
              />
            ) : (
              <SpotifyLogoWithTextSVG width="0.8" height="0.8" />
            )}
          </div>
        </div>
        <div className="centerwrapper">
          <div className="playergrid">
            <div className="h3-title">These players are already waiting!!</div>
            {game && game.players && game.players.map((player, index) => (
              <UserStatWithIcon key={index} username={player.username} currentStanding="?"></UserStatWithIcon>
            ))}
          </div>
        </div>

        <div className="centerwrapper">
          <div className="buttonContainer">
            <Button width="45%" onClick={handleLeave}>Leave</Button>
            <Button width="45%" onClick={handleLeave}>I am ready</Button>
          </div>
        </div>
      </div>
    </div>
  </div>);
};


export default LobbyWaitingRoom;

