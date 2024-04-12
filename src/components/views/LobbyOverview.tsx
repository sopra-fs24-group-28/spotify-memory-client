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

  async function fetchData() {
    try {
      const response = await api.get("/game");
      const overviewData = response.data;
      const initialOverview = new OverviewDTO();

      Object.entries(overviewData).forEach(([gameID, data]) => {
        initialOverview.addOrUpdateGame(gameID, data);
      });
      console.log(initialOverview);

    } catch (error) {
      console.error(`Something went wrong while fetching the Gameoverview: \n${handleError(error)}`);
    }

  }

  useEffect(() => {
    fetchData();

    // Assuming Client() comes from a STOMP JS library
    const client = new Client();
    client.brokerURL = "ws://localhost:8080/ws";

    client.onConnect = function (frame) {
      // Connection is now established, you can safely publish messages
      console.log("Connected");

      client.subscribe("/topic/overview", (obj) => {
        console.log("Received");
        console.log(obj.body)
        // TODO: appropriately consume the update 
      });

      client.publish({
        destination: "/app/overview",
        body: "Hello"
      });
    };

    client.activate();

    // Cleanup function to disconnect the client when the component unmounts
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };



    // try {
    //   stompClient.activate();
    //   stompClient.publish({
    //     destination: "/app/overview",
    //   })
    // } catch (error) {
    //   console.log(stompClient)
    //   console.log(error);
    //   alert("Something went wrong setting up the websocket. Try again later.");
    // }

    // //cleanup once we leave
    // return () => {
    //   stompClient.deactivate();
    // };
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
