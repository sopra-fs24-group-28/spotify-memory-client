import React, { useEffect, useState } from "react";
import "styles/views/LobbyOverview.scss";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import LobbyObject from "../ui/LobbyObject";
import { Button } from "../ui/Button";
import { Client } from "@stomp/stompjs";
import OverviewDTO from "../../communication/websocket/dto/overviewDTO.js";


const LobbyOverview = () => {
  const navigate = useNavigate();
  const [receivedGameStates, setReceivedGameStates] = useState([]);

  function doReturn() {
    navigate("/");
  }

  async function fetchData(){
    try {
      const response = await api.get("/ws/overview");

      if (response.status !== "101") {
        alert("There was a Problem fetching the Gameoverview in its initial state. Please try again.");
      }

      const overviewData = response.data;

      const initialOverview = new OverviewDTO();

      Object.entries(overviewData).forEach(([gameID, data]) => {
        initialOverview.addOrUpdateGame(gameID, data);
      });
      console.log(initialOverview);

    } catch (error) {
      console.error(`Something went wrong while fetching the Gameoverview: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while fetching the Gameoverview! See the console for details.");
    }

  }

  useEffect(() => {
    //get current overviewdto via rest call
    fetchData()

    //get websocket conectionn
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws", onConnect: () => {
        console.log("Connected");
        stompClient.subscribe("/ws/overview", (greeting) => {
          setReceivedGameStates(prev => [...prev, JSON.parse(greeting.body).content]);
        });
      },
    });
    try {
      stompClient.activate();
    } catch (error) {
      alert("Something went wrong setting up the websocket. Try again later.");
    }

    //cleanup once we leave
    return () => {
      stompClient.deactivate();
    };
  }, []);


  function createlobby() {
    navigate("/customizeGame");
  }


  return (<div className="BaseContainer">
    <div className="BaseDivLobby">
      <div className="gridhandler">
        <Button width={"80%"} height={"30%"} onClick={createlobby}>Create new Lobby</Button>
        {/*dummy for ws testing TODO: replace with adjusting the games accordingly*/}
        <div>
          Messages:
          {receivedGameStates.map((msg, index) => (<div key={index}>{msg}</div>))}
        </div>
        {/*dummy ends// TODO: replace with real objects*/}
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
        <LobbyObject></LobbyObject>
      </div>
    </div>
  </div>);

};

export default LobbyOverview;
