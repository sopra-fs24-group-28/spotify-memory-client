import React, { useEffect, useState } from "react";
import "styles/ui/LobbyObject.scss";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "./ProfileCircle";
import { Button } from "./Button";
import PropTypes from "prop-types";
import { api } from "helpers/api";
import LobbyWaitingRoom from "../views/LobbyWaitingRoom";


const LobbyObject = (props) => {
  const navigate = useNavigate();
/*
  const [playlistImg, setPlaylistImg] = useState(props.gameParameter?.GameParameters?.playlist?.images?.[0]);
*/
  const [avatarImg, setAvatarImg] = useState("img");
  let lobby = props.lobby ? props.lobby :  null;

  useEffect(() => {

  }, []);

  async function join() {
    //TODO: delete later as its mocked now
/*
    navigate(`/lobby/${lobbyId}`, { state: { gameParameter: gameParameters } });
*/

     try {
       if (lobby.lobbyId) {
         const response = await api.put(`/game/${lobby.lobbyId}/player`);
         if (response.status === 200) {
           navigate(`/lobby/${lobby.lobbyId}`, { state: { lobby: lobby } });
         } else {
           console.log("debug");
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
{/*
      <img src={playlistImg} alt="RapCaviar" className="playlist-image" />
*/}
    </div>
    <span className="playlist-name second-column-top-item">{lobby.gameParameters.playlist}</span>
    <div className="user-avatars second-column-bottom-item">
      <ProfileCircle height={25} width={25} url={avatarImg} />
      <ProfileCircle height={25} width={25} url={avatarImg} />
      <ProfileCircle height={25} width={25} url={avatarImg} /><ProfileCircle height={25} width={25} url={avatarImg} />
    </div>
    <Button width="70%" height="50%" className="lobby-overview-button third-column-item" onClick={join}>Join</Button>
  </div>);

}

LobbyObject.propTypes = {
  lobby: PropTypes.object,
};

export default LobbyObject;
