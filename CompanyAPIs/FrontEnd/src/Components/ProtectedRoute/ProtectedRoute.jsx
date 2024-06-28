import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken")) {
    //user msgl =? comp
    return props.children;
  } else {
    // new => login
    return <Navigate to={"/"} />;
  }
}
