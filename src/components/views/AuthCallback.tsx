import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate, useSearchParams} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseMessage, setResponseMessage] = useState();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  

  useEffect(() => {
    async function auth_user() {
      try {
        const requestBody = JSON.stringify({ code });
        const response = await api.post('/auth/token', requestBody);
        
        // Store the token into the local storage.
        // assuming response already 200, otherwise would have been caught by handleError
        localStorage.setItem("token", response.data);
        // routing user to lobby overview screen upon successful login
        navigate("/overview");
        
        // Login successfully worked --> navigate to the route /game in the GameRouter
      } catch (error) {
        console.log(error);
        setResponseMessage(error.message + " – " + error.response.data.message);
        // alert(
        //   `Something went wrong during the login: \n${handleError(error)}`
        // );
        // navigate("/login");
      }
    }
    auth_user();
    }, [] );

  const returnToLogin = () => {
    try {
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong, could not return to login: \n${handleError(error)}`
      );
    }
  };

  let body = "Redirecting ..."

  if (responseMessage) {
    console.log(responseMessage)
    body = (
      <div>
        <div>{responseMessage}</div>
        <div className="login button-container">
          <Button width="20em" 
                  onClick={() => returnToLogin()}>Return to Login</Button>
        </div>
      </div>
    );
    

  }


  return ( <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div className="login button-container">
              {body}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default AuthCallback;
