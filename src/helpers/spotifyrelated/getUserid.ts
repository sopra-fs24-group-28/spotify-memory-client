import { api } from "../api";

export const getSpotifyUserId = async () => {
  const response = await api.get("https://api.spotify.com/v1/me");
  console.log(response);
};
