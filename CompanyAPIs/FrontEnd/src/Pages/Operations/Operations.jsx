import React from "react";
import { Link } from "react-router-dom";
import { AllOperations } from "../AllOperations/AllOperations";

export const Operations = () => {
  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white">Home {">"} All Operations</h2>
        </div>
      </header>
      <div className="container mt-5">
        <div className="col-md-12 text-end">
          <Link className="btn btn-custom" to={"/operationForm"} style={{backgroundColor:'#fd743c  '}}>
            Create new Operation
          </Link>
        </div>
        <AllOperations />
      </div>
    </>
  );
};
