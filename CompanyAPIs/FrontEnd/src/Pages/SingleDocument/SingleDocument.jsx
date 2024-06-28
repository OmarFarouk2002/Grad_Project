import React from "react";
import { useParams } from "react-router-dom";

export const SingleDocument = () => {
  const { id } = useParams();

  return <div className="mt-5">SingleDocument</div>;
};
