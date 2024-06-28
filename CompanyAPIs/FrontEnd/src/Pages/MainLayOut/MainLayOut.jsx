import React, { useContext } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export const MainLayOut = () => {
  let { setUserToken } = useContext(authContext);
  if (localStorage.getItem("userToken")) {
    // set context
    setUserToken(localStorage.getItem("userToken"));
  }
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
