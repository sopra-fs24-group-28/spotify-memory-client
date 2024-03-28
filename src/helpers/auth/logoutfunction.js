export const logout = (navigate) => {
  localStorage.clear()
  console.log("User logged out");
  navigate('/login');
};
