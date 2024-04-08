import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseMessage, setResponseMessage] = useState();
  const code = searchParams.get("code");

  useEffect(() => {
    async function auth_user() {
      try {
        const requestBody = JSON.stringify({ code });
        console.log("successfully fetched token");
        console.log(code);
        const response = await api.post("/auth/token", requestBody);
        // assuming response already 200, otherwise would have been caught by handleError
        localStorage.setItem("token", response.data);
        // routing user to lobby overview screen upon successful login
        navigate("/overview");

      } catch (error) {
        console.log(error);
        setResponseMessage(`${error.message ?? "There was as error, please try again"} ${error.response?.data?.message ?? ""}`);
      }
    }

    auth_user();
  }, []);

  const returnToLogin = () => {
    try {
      navigate("/login");
    } catch (error) {
      alert(`Something went wrong, could not return to login: \n${handleError(error)}`);
    }
  };

  let body = "Redirecting ...";

  if (responseMessage) {
    console.log(responseMessage);
    body = (<div>
      <div className="h2-title">{responseMessage}</div>
      <div className="login button-container">
        <Button
          className="spotifyButton"
          onClick={() => returnToLogin()}>Return to Login</Button>
      </div>
    </div>);
  }

  return(<BaseContainer>
    <div className="login container">
      <div className="login form">
        {body}
      </div>
    </div>
  </BaseContainer>);
};


export default AuthCallback;
