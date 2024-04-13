import { api } from "../api";

export const logout = async (navigate) => {

  //TODO: add header once clear how we do it
  const response = await api.delete("/auth/token");
  localStorage.clear();
  console.log("User logged out");
  navigate("/login");
};
