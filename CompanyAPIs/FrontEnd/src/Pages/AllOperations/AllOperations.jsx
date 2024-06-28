import React, { useContext, useEffect, useRef, useState } from "react";
import ship from "./../../assets/images/11-types-of-containers.webp";
import { Link, useNavigate } from "react-router-dom";
import { operationContext } from "../../Context/OperationsContext";

export const AllOperations = () => {
  const { getAllOperations, deleteOperation } = useContext(operationContext);
  const [allOperations, setallOperations] = useState([]);

  async function getOperations() {
    const { data, status } = await getAllOperations(
      localStorage.getItem("currentUserId")
    );
    setallOperations(data.data);
  }

  const navigate = useNavigate();

  async function handleDelete(id) {
    const { data } = await deleteOperation(id);
    getOperations();
  }

  async function handleEdit(operationDetails) {
    navigate(`/operationForm`, {
      state: operationDetails,
    });
  }

  useEffect(() => {
    getOperations();
  }, [allOperations]);

  return (
    <div className="row gy-5">
      {allOperations?.length > 0 ? (
        <>
          {/* <h2 className="my-5">All Operations</h2> */}
          {allOperations.map(
            (operation) =>
              !operation.isDeleted && (
                <div className="col-md-6 col-lg-4 " key={operation.id}>
                  <div className="card">
                    <Link to={`/operation/${operation.id}`}>
                      <div className="">
                        <img className="card-img-top" src={ship} alt="Title" />
                        <div className="card-body p-3">
                          <h4 className="card-title text-capitalize">
                            {operation.name}
                          </h4>
                        </div>
                      </div>
                    </Link>

                    <div className="d-flex justify-content-around mb-3">
                      <button
                        className="btn btn-sm border border-2 border-secondary "
                        onClick={() => {
                          handleEdit(operation);
                        }}
                      >
                        <i
                          className="fa-solid fa-pen-to-square fs-5 mx-1 px-2 text-muted"
                          style={{ cursor: "pointer" }}
                        ></i>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm border border-2 border-secondary"
                        onClick={() => {
                          handleDelete(operation.id);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash mx-1 px-2 fs-5 text-danger"
                          style={{ cursor: "pointer" }}
                        ></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </>
      ) : (
        <div className="row mt-5">
          <p className="h2">No Data !</p>
        </div>
      )}
    </div>
  );
};
