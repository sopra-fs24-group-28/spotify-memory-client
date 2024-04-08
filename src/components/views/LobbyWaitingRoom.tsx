import React, { useEffect, useState } from "react";
import "styles/views/LobbyWaitingRoom.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { UserStatWithIcon } from "../ui/UserStatWithIcon";
import PropTypes from 'prop-types';


const LobbyWaitingRoom = (props) => {
  const navigate = useNavigate();
  const [lobbyParams, setLobbyParams] = useState(props.lobbyParams ? props.lobbyParams : null)

  useEffect(() => {
      //TODO Diyar spotify sdk might have to be initialised here i guess?

    //mocking, to be removed once websocket is ready
    setLobbyParams({
      GameParameters:{something: "something"},
      players: [{name: "Elias"},{name: "Niklas"}]
    })
    console.log(lobbyParams);

  }, []);

  function handleLeave (){
    //TODO: kill websocket connection
    navigate("/lobbyOverview")
  }

  function handleReady(){
    //TODO: send ready state via websocket connection:
  }


  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div className="gridhandler">
        <div className="centerwrapper">
          <div className="spotifyPlaylistContainer"></div>
        </div>
        <div className="centerwrapper">
          <div className="playergrid">
            <div className="h3-title">These players are already waiting!!</div>
            {lobbyParams && lobbyParams.players && lobbyParams.players.map((player, index) => (
              <UserStatWithIcon key={index} username={player.name} currentStanding="?"></UserStatWithIcon>
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
  lobbyParams: PropTypes.string,
};

export default LobbyWaitingRoom;

