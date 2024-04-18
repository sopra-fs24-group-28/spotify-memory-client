import { api } from "../api";

export const logout = async (navigate) => {

  try {
    const response = await api.delete("/auth/token");
  }catch (error){
    console.log(error);
  }
  localStorage.clear();
  console.log("User logged out");
  navigate("/login");
};
