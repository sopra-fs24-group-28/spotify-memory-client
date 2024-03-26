import React, { useState } from "react";
import axios from "axios";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const Login = () => {
  const navigate = useNavigate();
  

  const doLogin = async () => {
    try {
      const client_id = "5aac3ff5093942be92372c19a12fdecd";
      const scope = "streaming playlist-read-private playlist-read-collaborative";
      const redirect_uri = "http://localhost:3000/auth_callback";
      const urlBase = "https://accounts.spotify.com/authorize?";
      const params = {
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      };
      const urlParams = new URLSearchParams(params).toString();
      // Perform redirection to Spotify's authorization endpoint
      //console.log(urlBase + urlParams);
      window.location.href = urlBase + urlParams;

      
      // // Get the returned user and update a new object.
      // const user = new User(response.data);

      // // Store the token into the local storage.
      // localStorage.setItem("token", user.token);

      // // Login successfully worked --> navigate to the route /game in the GameRouter
      // navigate("/game");
    } catch (error) {
      alert(
        `Something went wrong during the login`
      );
    }
  };

  return ( <BaseContainer>
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
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Login;
