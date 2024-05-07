import { api } from "../api";
import toastNotify from "../Toast";

export const logout = async (navigate) => {

  try {
    const response = await api.delete("/auth/token");
  }catch (error){
    toastNotify("There was an error when logging out", 1000, 'warning')
  }
  localStorage.clear();
  navigate("/login");
};
