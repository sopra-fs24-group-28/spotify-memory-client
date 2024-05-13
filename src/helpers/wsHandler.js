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
    this.client.connectHeaders = { "Authorization": `Bearer ${localStorage.getItem("token")}` };
  }


  async connect() {
    this.client.brokerURL = getWSDomain() + "?token=" + `${localStorage.getItem("token")}`;
    this.client.onConnect = (frame) => {
      this.client.subscribe(this.wsEndpoint, this.receiverFunction);
    };

    // this.client.onStompError = (frame) => {
    //   console.error('Broker reported error: ' + frame.headers['message']);
    //   console.error('Additional details: ' + frame.body);
    // };

    this.client.activate();
  };

  async setReceiverFunction(newReceiverFunction) {
    this.receiverFunction = newReceiverFunction;
    if (this.client.connected) {
      this.client.subscribe(this.wsEndpoint, this.receiverFunction);
    }
  }

  // TODO: fetchData should not be defined here but passed as a parameter
  // in current state only useful for lobby overview

  async fetchData() {
    try {
      const response = await api.get(this.restEndpoint);
      const overviewData = response.data;
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
    await this.client.deactivate();
  }

  send(data) {
    if (!this.client.connected) {
      this.connect().then(() =>
        this.client.publish({
        destination: this.wsDestination,
        body: data
      }));
    } else {
      this.client.publish({
        destination: this.wsDestination,
        body: data
      })
    }

  }

}

export default WSHandler;
