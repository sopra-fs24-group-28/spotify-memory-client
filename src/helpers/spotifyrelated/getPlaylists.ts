import toastNotify from "../Toast";

const { api, handleError } = require("../api");

export async function getSpotifyPlaylist() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await api.get(`spotify/user/playlist/names?accessToken=${accessToken}`);
      if (response.status === 200) {
        return response.data.playlists;
      }
    } catch (error) {
      toastNotify(`Something went wrong getting the Spotify Playlists. Please check your connection and reload the page.\n${handleError(error)}`, 5000);

      return null
    }
  }
}

