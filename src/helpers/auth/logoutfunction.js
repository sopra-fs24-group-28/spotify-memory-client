import { api } from "../api";

export const logout = async (navigate) => {
 
  const response = await api.delete("/auth/token")
  localStorage.clear()
  console.log("User logged out");
  navigate('/login');
};
