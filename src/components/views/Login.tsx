import React from "react";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";

const Login = () => {
  const doLogin = async () => {
    try {
      const client_id: string = "5aac3ff5093942be92372c19a12fdecd";
      const scope: string = "streaming playlist-read-private playlist-read-collaborative";
      const redirect_uri: string = `${window.location.origin}/auth_callback`;
      const urlBase: string = "https://accounts.spotify.com/authorize?";
      const params = {
        response_type: "code", client_id: client_id, scope: scope, redirect_uri: redirect_uri,
      };
      const urlParams: string = new URLSearchParams(params).toString();
      // Perform redirection to Spotify's authorization endpoint
      window.location.href = urlBase + urlParams;
    } catch (error) {
      alert(`Something went wrong during the login`);
    }
  };

  return (<BaseContainer>
    <div className="login container">
      <div className="login form">
        <div className="login button-container">
          <Button
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
