import { Client } from "@stomp/stompjs";
import { getWSDomain } from "./getDomain";
import { api, handleError } from "./api";
import OverviewDTO from "../communication/websocket/dto/overviewDTO.js";

class WSHandler {
  constructor(restEndpoint, wsEndpoint, wsDestination, receiverFunction) {
    this.restEndpoint = restEndpoint;
    this.wsEndpoint = wsEndpoint;
    this.wsDestination = wsDestination;
    this.receiverFunction = receiverFunction;
    this.client = new Client();
  }

  async connect() {
    this.client.brokerURL = getWSDomain();
    this.client.onConnect = (frame) => {
      console.log("Connected");
      this.client.subscribe(this.wsEndpoint, this.receiverFunction);
    };
    await this.fetchData();
    this.client.activate();
  }

  async fetchData() {
    try {
      const response = await api.get(this.restEndpoint);
      const overviewData = response.data;
      const initialOverview = new OverviewDTO({});
	  
      Object.entries(overviewData).forEach(([gameID, data]) => {
		  initialOverview.addOrUpdateGame(gameID, data);
		});
	  console.log(initialOverview);
	  
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
