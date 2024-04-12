import React, { useState } from "react";
import "styles/ui/LobbyObject.scss";
import { useNavigate } from "react-router-dom";
import ProfileCircle from "./ProfileCircle";
import { Button } from "./Button";


const LobbyObject = (props) => {
  const navigate = useNavigate();
  const [playlistImg, setPlaylistImg] = useState("");
  const [avatarImg, setAvatarImg] = useState("img");

  function join() {
    navigate("/Game1");
  }

  return (
    <div className="playlist-join-card">
      <div className="playlist-cover first-column-item">
        <img src={playlistImg} alt="RapCaviar" className="playlist-image" />
      </div>
      <span className="playlist-name second-column-top-item">Rap</span>
      <div className="user-avatars second-column-bottom-item">
        <ProfileCircle height={25} width={25} url={avatarImg} />
        <ProfileCircle height={25} width={25} url={avatarImg} />
        <ProfileCircle height={25} width={25} url={avatarImg} /><ProfileCircle height={25} width={25} url={avatarImg} />
      </div>
      <Button width="70%" height="50%" className="lobby-overview-button third-column-item" onClick={join}>Join</Button>
    </div>);

};


export default LobbyObject;
