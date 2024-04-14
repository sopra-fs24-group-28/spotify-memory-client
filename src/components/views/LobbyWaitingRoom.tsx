import React, { useEffect, useState } from "react";
import "styles/views/LobbyWaitingRoom.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import SpotifyLogoWithTextSVG from "../ui/icons-svg/SpotifyLogoWithTextSVG";


const LobbyWaitingRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameId = useParams()
  const [gameParameter, setGameParameter] = useState(location.state.gameParameter ? location.state.gameParameter : null);


  useEffect(() => {
    //TODO Diyar spotify sdk might have to be initialised here i guess?

    //mocking, to be removed once websocket is ready
    // setGameParameter({
    //   // GameParameters: { playlist: { images: ["https://mosaic.scdn.co/640/ab67616d00001e021677f484125173d96fd1f4fdab67616d00001e021a3804c279594ebceecec4a2ab67616d00001e021b96e645016c4d431842aa93ab67616d00001e023a8b694ef93dbb4ca2c68fc2"] } },
    //   players: [{ userId: 1, username: "Elias" }, { userId: 2, username: "Niklas" }],
    // });
    // console.log(gameParameter);

  }, []);

  async function handleLeave() {

    // rest call that player delete request with
    try {
      const response = await api.delete(`games/${gameId}/player`);
      if (response.ok) {
        //TODO: kill websocket connection

        navigate("lobbyoverview") //Todo: anpassen wenn klar wie

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
          <div className={gameParameter?.GameParameters?.playlist?.images?.[0] ? "imgContainer" : "spotifyPlaylistContainer"} >
            {gameParameter?.GameParameters?.playlist?.images?.[0] ? (
              <img
                src={gameParameter.GameParameters.playlist.images[0]}
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
            {gameParameter && gameParameter.players && gameParameter.players.map((player, index) => (
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

LobbyWaitingRoom.propTypes = {
  lobbyParams: PropTypes.object,
  gameId: PropTypes.string,
};

export default LobbyWaitingRoom;

