import React, { useState } from "react";
import "styles/ui/LobbyObject.scss";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "./ProfileCircle";
import PropTypes from "prop-types";
import Lobby from "models/Lobby";
import { Button } from "./Button";


const LobbyObject = (lobby: Lobby) => {
  const navigate = useNavigate();
  const [playlistImg, setPlaylistImg] = useState(lobby.props.gameParameters.playlistImageUrl);
  function join() {
    navigate("/Game" + lobby.props.lobbyId);
  }

  return (
    <div className="playlist-join-card">
      <div className="playlist-cover first-column-item">
        <img src={playlistImg} alt="RapCaviar" className="playlist-image" />
      </div>
      <span className="playlist-name second-column-top-item">{lobby.props.gameParameters.playlist}</span>
      <div className="user-avatars second-column-bottom-item">
        {lobby.props.users.map((user) => (
          <li key={user.userId}>
            <ProfileCircle height={40} width={40} url={user.profileImageUrl}/>
          </li>
        ))}
      </div>
      <Button width="70%" height="50%" className="lobby-overview-button third-column-item" onClick={join}>Join</Button>
    </div>);

};

// Define prop-types for validation
LobbyObject.propTypes = {
  gameParameters: PropTypes.shape({
    playlistImageUrl: PropTypes.string,
  }).isRequired,
};



export default LobbyObject;
