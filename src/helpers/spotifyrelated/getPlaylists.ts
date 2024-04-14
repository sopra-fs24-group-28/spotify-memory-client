const { api, handleError } = require("../api");

export async function getSpotifyPlaylist() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await api.get(`/user/playlist/names?accessToken=${accessToken}`);
      if (response.status === 200) {
        console.log(response);

        return response.data.playlists;
      }
    } catch (error) {
      alert(`Something went wrong getting the Spotify id. Please check your connection.\n${handleError(error)}`);
    }
  }
}
