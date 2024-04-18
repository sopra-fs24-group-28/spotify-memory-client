import React, { useEffect, useState } from "react";
import "styles/views/LobbyWaitingRoom.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import { api, handleError } from "helpers/api";
import SpotifyLogoWithTextSVG from "../ui/icons-svg/SpotifyLogoWithTextSVG";


//TODO schauen wie Gamesocket informationen schickt und lobbyparams dadurch anpassen
const GameOverScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lobbyParams, setLobbyParams] = useState();
  const [scoreboard, setScoreBoard] = useState();

  useEffect(() => {
    //mocking data remove later
    setScoreBoard({
      "henry123": 3,
      "elias1999": 1,
      "niklas2001": 5,
      "henry1234": 3,
      "elias19994": 9,
      "niklas20014": 6,
    });

    setLobbyParams({ playerList: [{ username: "henry123" }, { username: "elias1999" }, { username: "niklas2001" }, { username: "henry1234" }, { username: "elias19994" }, { username: "niklas20014" }] });
  }, []);


  async function handleLeave() {

    // rest call that player delete request with
    try {
      const response = await api.delete(`game/${lobbyParams.lobbyId}/player`);
      if (response.status === 204) {

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
      <h2 className="h2-title">GAME OVER! Congratulations</h2>
      <div className="gridhandler">
        <div className="centerwrapper">
          <div
            className={lobbyParams?.gameParameters?.playlist?.images?.[0] ? "imgContainer" : "spotifyPlaylistContainer"}>
            {lobbyParams?.gameParameters?.playlist?.images?.[0] ? (
              <img
                src={lobbyParams.gameParameters.playlist.images[0]}
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
            <div className="h3-title">ScoreBoard</div>
            {lobbyParams && lobbyParams.playerList && lobbyParams.playerList.sort((a, b) => scoreboard[a.username] - scoreboard[b.username]).map((player, index) => (
              <React.Fragment key={index}>
                <UserStatWithIcon username={player.username} currentStanding={scoreboard[player.username]} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="centerwrapper">
          <div className="buttonContainer">
            <Button width="45%" onClick={handleLeave}>Leave</Button>
            <Button width="45%" onClick={handleLeave}>Restart</Button>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default GameOverScreen;

