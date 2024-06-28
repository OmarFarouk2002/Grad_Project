import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const SingleUserOperation = () => {
  const { id } = useParams();
  const [operationDetails, setOperationDetails] = useState({});

  const navigate = useNavigate();

  async function singleOperation() {
    const { data } = await axios.get(
      `https://companygradution.runasp.net/api/Operations/operation/${id}`
    );
    setOperationDetails(data.data);
  }

  useEffect(() => {
    singleOperation();
  }, []);

  function transferData() {
    navigate(`/invoice`, {
      state: operationDetails,
    });
  }

  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Operation Details</h2>
        </div>
      </header>
      <div className="mt-5 container  ">
        <h5 className="h4 text-end ">{operationDetails.isPaid && "Paid"}</h5>
        <div className="bg-white my-3 rounded shadow-sm p-3 row">
          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main "> Operation Name : </span>
            {operationDetails.name}
          </p>
          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main "> Number Of Cases : </span>
            {operationDetails.numberOfCases}
          </p>

          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main "> Port Of Distance : </span>
            {operationDetails.portOfDistance}
          </p>
          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main "> Port Of Loading : </span>
            {operationDetails.portOfLoading}
          </p>
          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main ">Number Of Units : </span>
            {operationDetails.numberOfUnits}
          </p>
          <p className="col-md-6 fs-4">
            <span className="fw-bold text-main ">Total Weight : </span>
            {operationDetails.totalWeight}
          </p>
        </div>

        {operationDetails.documents && (
          <>
            <h2>Document</h2>
            <div className="bg-white my-3 rounded shadow-sm p-3 row">
              <p className="col-md-12 fs-4">
                <span className="fw-bold text-main "> Document Name : </span>
                {operationDetails.documents.name}
              </p>{" "}
              <p className="col-md-12 fs-4">
                <span className="fw-bold text-main "> VoyageNumber : </span>
                {operationDetails.documents.voyageNumber}
              </p>{" "}
              <p className="col-md-6 fs-4">
                <span className="fw-bold text-main "> Container Number : </span>
                {operationDetails.documents.containerNumber}
              </p>
            </div>
            {!operationDetails.isPaid && (
              <div className="row justify-content-end">
                <button
                  className="btn btn-outline-custom col-1"
                  onClick={transferData}
                >
                  {" "}
                  Invoice
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
