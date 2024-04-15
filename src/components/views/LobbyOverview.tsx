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
  const [gameParameters, setGameParameters] = useState([]);

  // Mocked game parameters
  const mockedGameParameters = [
    {
      GameParameters: {
        playlist: {
          images: ["https://mosaic.scdn.co/640/ab67616d00001e0213b7462235a959a990be5decab67616d00001e0268b6b8b510e3b764a0cf7e31ab67616d00001e026f91180b662ca15ad2fb88f0ab67616d00001e02c687a96a52b27e0db7527a52"]
        }
      },
      players: [{ userId: 1, username: "Elias" }, { userId: 2, username: "jvbdi" }, { userId: 3, username: "Diyar" }],
    },
    {
      GameParameters: {
        playlist: {
          images: ["https://mosaic.scdn.co/640/ab67616d00001e021677f484125173d96fd1f4fdab67616d00001e021a3804c279594ebceecec4a2ab67616d00001e021b96e645016c4d431842aa93ab67616d00001e023a8b694ef93dbb4ca2c68fc2"]
        }
      },
      players: [{ userId: 1, username: "somebody" }, { userId: 2, username: "coolstuff" }, { userId: 3, username: "three" }],
    }
  ];

  // Fetch data function
  // async function fetchData() {
  //   try {
  //     const response = await api.get("/ws/overview");
  //
  //     if (response.status !== "101") {
  //       alert("There was a Problem fetching the Gameoverview in its initial state. Please try again.");
  //     }
  //
  //     const overviewData = response.data;
  //
  //     const initialOverview = new OverviewDTO();
  //
  //     Object.entries(overviewData).forEach(([gameID, data]) => {
  //       initialOverview.addOrUpdateGame(gameID, data);
  //     });
  //     console.log(initialOverview);
  //
  //   } catch (error) {
  //     console.error(`Something went wrong while fetching the Gameoverview: \n${handleError(error)}`);
  //     console.error("Details:", error);
  //     alert("Something went wrong while fetching the Gameoverview! See the console for details.");
  //   }
  // }
  //
  // useEffect(() => {
  //   // Fetch current overviewdto via rest call
  //   fetchData();
  //
  //   // Get websocket connection
  //   const stompClient = new Client({
  //     brokerURL: "ws://localhost:8080/ws",
  //     onConnect: () => {
  //       console.log("Connected");
  //       stompClient.subscribe("/ws/overview", (greeting) => {
  //         setReceivedGameStates(prev => [...prev, JSON.parse(greeting.body).content]);
  //       });
  //     },
  //   });
  //   try {
  //     stompClient.activate();
  //   } catch (error) {
  //     alert("Something went wrong setting up the websocket. Try again later.");
  //   }
  //
  //   // Cleanup once we leave
  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, []);

  function createlobby() {
    navigate("/customizeGame");
  }

  return (
    <div className="BaseContainer">
      <div className="BaseDivLobby">
        <div className="gridhandler">
          <Button width={"80%"} height={"30%"} onClick={createlobby}>Create new Lobby</Button>

          {/* Render LobbyObject components */}
          {mockedGameParameters.map((gameParam, index) => (
            <LobbyObject key={index} gameId={index + 1} gameParameter={gameParam}></LobbyObject>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LobbyOverview;
