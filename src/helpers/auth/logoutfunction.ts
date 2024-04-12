import { api } from "../api";

export const logout = async (navigate) => {

  //TODO: add header once clear how we do it
  const headers: { Authorization: string } = { "Authorization": `Bearer ${localStorage.getItem("token")}` };
  const response = await api.delete("/auth/token", {headers})
  localStorage.clear()
  console.log("User logged out");
  navigate('/login');
};
