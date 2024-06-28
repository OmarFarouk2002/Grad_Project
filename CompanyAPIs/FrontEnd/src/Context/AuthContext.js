import axios from "axios";
import { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  function handleRegister(values) {
    return axios
      .post("https://companygradution.runasp.net/api/Auth/register", values)
      .then((data) => data)
      .catch((error) => error.response);
  }

  function handleLogin(values) {
    return axios
      .post("https://companygradution.runasp.net/api/Auth/login", values)
      .then((data) => data)
      .catch((error) => error.response);
  }

  return (
    <authContext.Provider
      value={{ handleRegister, handleLogin, userToken, setUserToken }}
    >
      {children}
    </authContext.Provider>
  );
}
