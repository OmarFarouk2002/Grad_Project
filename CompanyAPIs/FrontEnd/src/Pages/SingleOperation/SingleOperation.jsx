import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { operationContext } from "../../Context/OperationsContext";
import { documentContext } from "./../../Context/DocumentsContext";

export const SingleOperation = () => {
  const { id } = useParams();
  const { getSingleOperation, deleteOperation } = useContext(operationContext);

  const [operationDetails, setOperationDetails] = useState({});
  const { deleteDocument } = useContext(documentContext);

  const navigate = useNavigate();

  async function singleOperation() {
    const { data } = await getSingleOperation(id);
    setOperationDetails(data.data);
  }

  async function handleDeleteOperation() {
    const { data } = await deleteOperation(id);
    navigate("/operation");
  }

  async function handleEditOperation() {
    navigate(`/operationForm`, {
      state: operationDetails,
    });
  }
  async function handleDeleteDocument(id) {
    const { data } = await deleteDocument(id);
    navigate("/operation");
  }

  async function handleEditDocument() {
    navigate(`/documentForm/${operationDetails.id}`, {
      state: operationDetails,
    });
  }

  useEffect(() => {
    singleOperation();
  }, []);

  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Operation Details</h2>
        </div>
      </header>
      <div className=" container py-5 ">
        <div className="bg-white my-3 rounded shadow-sm p-3 row">
          <div className="d-flex justify-content-end">
            <i
              className="fa-solid fa-pen-to-square fs-5 mx-3 text-muted"
              onClick={() => {
                handleEditOperation();
              }}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="fa-solid fa-trash mx-3 fs-5 text-danger"
              onClick={() => {
                handleDeleteOperation();
              }}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <p className="col-md-6">
            <span className="fw-bold text-main"> Operation Name : </span>
            {operationDetails.name}
          </p>
          <p className="col-md-6">
            <span className="fw-bold text-main"> Number Of Cases : </span>
            {operationDetails.numberOfCases}
          </p>

          <p className="col-md-6">
            <span className="fw-bold text-main"> Port Of Distance : </span>
            {operationDetails.portOfDistance}
          </p>
          <p className="col-md-6">
            <span className="fw-bold text-main"> Port Of Loading : </span>
            {operationDetails.portOfLoading}
          </p>
          <p className="col-md-6">
            <span className="fw-bold text-main">Number Of Units : </span>
            {operationDetails.numberOfUnits}
          </p>
          <p className="col-md-6">
            <span className="fw-bold text-main">Total Weight : </span>
            {operationDetails.totalWeight}
          </p>
          <p className="col-md-6">
            <span className="fw-bold text-main"> Paid: </span>

            <input
              type="checkbox"
              className="form-check-input"
              value={operationDetails.isPaid}
              checked={operationDetails.isPaid}
              disabled
            />
          </p>
        </div>

        {operationDetails.documents && !operationDetails.documents.isDeleted ? (
          <>
            <h3>Document</h3>
            <div className="bg-white my-3 rounded shadow-sm p-3 row">
              <div className="d-flex justify-content-end">
                <i
                  className="fa-solid fa-pen-to-square fs-5 mx-3 text-muted"
                  onClick={() => {
                    handleEditDocument();
                  }}
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="fa-solid fa-trash mx-3 fs-5 text-danger"
                  onClick={() => {
                    handleDeleteDocument(operationDetails.documents.id);
                  }}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <p className="col-md-12">
                <span className="fw-bold text-main"> Document Name : </span>
                {operationDetails.documents.name}
              </p>{" "}
              <p className="col-md-12">
                <span className="fw-bold text-main"> VoyageNumber : </span>
                {operationDetails.documents.voyageNumber}
              </p>{" "}
              <p className="col-md-6">
                <span className="fw-bold text-main"> Container Number : </span>
                {operationDetails.documents.containerNumber}
              </p>
            </div>
          </>
        ) : (
          <Link
            className="btn  btn-outline-custom"
            to={`/documentForm/${operationDetails.id}`}
          >
            Create new Document
          </Link>
        )}
      </div>
    </>
  );
};
