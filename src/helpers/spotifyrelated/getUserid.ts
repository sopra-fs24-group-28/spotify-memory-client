import { api } from "../api";

export const getSpotifyUserId = async () => {
  const headers: { Authorization: string } = { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` };
  const response = await api.get("https://api.spotify.com/v1/me", { headers });
  console.log(response);
};
