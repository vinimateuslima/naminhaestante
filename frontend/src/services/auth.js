//Axios
import axios from "../axios-config";

export const isAuthenticated = async () => {

  const token = localStorage.getItem("TOKEN_KEY") !== null;

  if (!token) {
    return false; // Verifica se não houver token
  }

  try {
    const res = await axios.get(`users/checkAuth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        console.log("passou")
        return true
        
      } else {
        return false
      }
  } catch (error) {
    console.error(error)
    return false
  }

};
export const getToken = () => localStorage.getItem("TOKEN_KEY");
export const login = (token) => {
  localStorage.setItem("TOKEN_KEY", token);
};
export const logout = () => {
  localStorage.removeItem("TOKEN_KEY");
};
