import React from "react";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import SpotifyLogoWithTextSVG from "../ui/icons-svg/SpotifyLogoWithTextSVG";

const Login = () => {
  const doLogin = async () => {
    try {
      const client_id: string = "5aac3ff5093942be92372c19a12fdecd";
      // const scope: string = "streaming playlist-read-private playlist-read-collaborative user-modify-playback-state user-read-currently-playing playlist-read-private user-read-private app-remote-control streaming user-modify-playback-state";
      const scope: string = "ugc-image-upload user-follow-modify playlist-modify-private playlist-modify-public user-library-modify playlist-read-collaborative user-read-currently-playing user-follow-read user-read-playback-position user-read-playback-state playlist-read-private user-read-recently-played user-top-read user-read-email user-library-read user-read-private app-remote-control streaming user-modify-playback-state"
      const redirect_uri: string = `${window.location.origin}/auth_callback`;
      const urlBase: string = "https://accounts.spotify.com/authorize?";
      const params = {
        response_type: "code", client_id: client_id, scope: scope, redirect_uri: redirect_uri,
      };
      const urlParams: string = new URLSearchParams(params).toString();
      // Perform redirection to Spotify's authorization endpoint
      window.location.href = urlBase + urlParams;
    } catch (error) {
      alert("Something went wrong during the login");
    }
  };

  return (<BaseContainer>
    <div className="login container">
      <div className="login form">

        <div className="h2-title">Login with your Spotify Credentials</div>
        <div className="logoContainer">
          <SpotifyLogoWithTextSVG width="1" height="1"></SpotifyLogoWithTextSVG>
        </div>
        <div className="button-container">
          <Button
            className="spotifyButton"
            onClick={() => doLogin()}
          >
            Login with Spotify
          </Button>
        </div>
      </div>
    </div>
  </BaseContainer>);
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Login;
