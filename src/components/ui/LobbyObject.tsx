import React from "react";
import "styles/ui/LobbyObject.scss";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "./ProfileCircle";
import { Button } from "./Button";
import PropTypes from "prop-types";
import { api } from "helpers/api";
import toastNotify from "../../helpers/Toast";


const LobbyObject = (props) => {
  const navigate = useNavigate();
  let lobby = props.lobby ? props.lobby : null;

  async function join() {
    try {
      if (lobby.lobbyId) {
        const response = await api.put(`/games/${lobby.lobbyId}/player`);
        if (response.status === 200) {
          navigate(`/lobby/${lobby.lobbyId}`, { state: { lobby: lobby } });
        } else {
        }
      } else {
        alert("no valid Game-id could be associated with the selected lobby. Please try again later. ");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="playlist-join-card">
      <div className="playlist-cover first-column-item">
        <img src={lobby.gameParameters.playlist.playlistImageUrl} alt="RapCaviar" className="playlist-image" />
      </div>
      <span className="playlist-name second-column-top-item">{lobby.gameParameters.playlist.playlistName}</span>
      <div className="user-avatars second-column-bottom-item">
        {lobby.playerList.map((user) => (
          <li key={user.userId}>
            <ProfileCircle height={40} width={40} url={user.imageUrl} />
          </li>
        ))}
      </div>
      { lobby.playerList.length >= lobby.gameParameters.playerLimit ? 
      <Button width="70%" height="50%" style={{"background" : "#868686"}} className="lobby-overview-button third-column-item">Full</Button>
      : 
      <Button width="70%" height="50%" className="lobby-overview-button third-column-item" onClick={join}>Join</Button>
      }
    </div>);
};

LobbyObject.propTypes = {
  lobby: PropTypes.object,
};

export default LobbyObject;
