import React, { useEffect, useState } from "react";
import "styles/ui/Player.scss";
import PropTypes from "prop-types";
import { api } from "helpers/api";


const track = {
  name: "",
  album: {
    images: [
      { url: "" },
    ],
  },
  artists: [
    { name: "" },
  ],
};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: any;
  }
}

function WebPlayback(props) {

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [volume, setVolume] = useState(0.5);
  const [deviceId, setDeviceId] = useState("");


  const loadSpotifyPlayer = () => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    //initialise
    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: `Spotymemory_${localStorage.getItem("userId")}_${deviceId}`,
        getOAuthToken: cb => {
          cb(props.token);
        },
        volume: volume,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id); // Set deviceId state when ready

      });

      player.addListener("not_ready", ({ device_id }) => {
        setDeviceId(null); // Set deviceId state when ready

      });

      player.addListener("player_state_changed", (state => {
        if (!state) {
          return;
        }
        setTrack(state.track_window.current_track);
        // setPaused(state.paused);
        player.getCurrentState().then(state => {
          (!state) ? setActive(false) : setActive(true);
        });
      }));
      player.connect();

    };
  };

  useEffect(() => {
    loadSpotifyPlayer();

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      localStorage.setItem("deviceId", deviceId);
      props.onDeviceIdReceived(deviceId);

      // Make API call
      const requestBody = JSON.stringify({ "deviceid": deviceId });
      try {
        const response = await api.post("spotify/user/deviceid", requestBody);
        // Handle response
      } catch (error) {
        // Handle error
      }
    };

    fetchData(); // Call the async function immediately

  }, [deviceId]);

  useEffect(() => {
    props.setPlayer(player); // Pass the player object to GameScreen
  }, [player, props]);

  const handleDecreaseVolume = () => {
    if (player && volume > 0) {
      const newVolume = Math.max(0, volume - 0.1); // Decrease volume by 0.1
      setVolume(newVolume);
      player.setVolume(newVolume).then(() => {
      });
    }
  };

  const handleIncreaseVolume = () => {
    if (player && volume >= 0) {
      const newVolume = Math.min(1, volume + 0.1); // Decrease volume by 0.1
      setVolume(newVolume);
      player.setVolume(newVolume).then(() => {
      });
    }
  };

  const handleReconnect = () => {
    if (player) {
      player.disconnect();
    }
    loadSpotifyPlayer();
  };

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Reconnect the Spotify Player! </b>
          </div>
          <div className="centerwrapper">
            <button className="spotifyButtonplayer" onClick={handleReconnect}>
              {"reconnect"}
            </button>
          </div>
        </div>
      </>);
  } else {
    return (
      <>
        <div className="base">
          {/*<img className="albumcoverinplayer" src={current_track?.album.images[0].url} alt="" />*/}
          <div className="now-playingside">
            <div className="textinfo">
              <div className="now-playing-name">{current_track?.name}</div>
              <div className="now-playing-artist">{current_track?.artists[0]?.name}</div>
            </div>
            <div className="button-container">
              <div className="volumebuttons">
                <button className="spotifyButtonplayer" onClick={handleDecreaseVolume}>
                  {"-"}
                </button>
                <button className="spotifyButtonplayer" onClick={() => {
                  player.togglePlay();
                }}>
                  {is_paused ? "PLAY" : "PAUSE"}
                </button>
                <button className="spotifyButtonplayer" onClick={handleIncreaseVolume}>
                  {"+"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;

WebPlayback.propTypes = {
  token: PropTypes.string,
  onDeviceIdReceived: PropTypes.func.isRequired, // Callback function prop
  setPlayer: PropTypes.func,
};
