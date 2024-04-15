import { api } from "../api";

export const logout = async (navigate) => {

  //TODO: add header once clear how we do it
  try {
    const response = await api.delete("/auth/token");
  }catch (error){
    console.log(error);
  }
  localStorage.clear();
  console.log("User logged out");
  navigate("/login");
};
