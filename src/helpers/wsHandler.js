import { Client } from "@stomp/stompjs";
import { getWSDomain } from "./getDomain";
import { api, handleError } from "./api";
import Lobby from "models/Lobby";

class WSHandler {
  constructor(restEndpoint, wsEndpoint, wsDestination, receiverFunction) {
    this.restEndpoint = restEndpoint;
    this.wsEndpoint = wsEndpoint;
    this.wsDestination = wsDestination;
    this.receiverFunction = receiverFunction;
    this.client = new Client();
    this.client.connectHeaders = { "login": `Bearer ${localStorage.getItem("token")}` };
  }

  async connect() {
    this.client.brokerURL = getWSDomain();
    this.client.onConnect = (frame) => {
      console.log("Connected");
      this.client.subscribe(this.wsEndpoint, this.receiverFunction);
    };
    this.client.activate();
  }

  // TODO: fetchData should not be defined here but passed as a parameter
  // in current state only useful for lobby overview

  async fetchData() {
    try {
      const response = await api.get(this.restEndpoint);
      const overviewData = response.data;
      console.log(overviewData);
      const initialOverview = [];
	  
      Object.entries(overviewData["games"]).forEach(([gameID, data]) => {
		  initialOverview.push(new Lobby(gameID, data));
		});

	  return initialOverview;
	  
    } catch (error) {
		console.error(`Something went wrong while fetching the Gameoverview: \n${handleError(error)}`);
    }
	
  }

  async disconnect() {
    this.client.connected ?? this.client.deactivate();
  }

  send(data) {
    this.client.publish({
      destination: this.wsDestination,
      body: data
    });
  }
}

export default WSHandler;
