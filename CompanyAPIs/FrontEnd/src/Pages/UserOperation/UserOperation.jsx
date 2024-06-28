import React, { useEffect, useState } from "react";
import ship from "./../../assets/images/11-types-of-containers.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserOperation = () => {
  const [allOperations, setallOperations] = useState([]);

  const currentUserId = localStorage.getItem("currentUserId");
  async function getOperations() {
    const { data } = await axios.get(
      `https://companygradution.runasp.net/api/Operations/UserOperation/${currentUserId}`
    );
    setallOperations(data.data);
  }

  useEffect(() => {
    getOperations();
  }, []);

  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white ">Home {">"} All Operations</h2>
        </div>
      </header>
      <div className="container">
        <div className="row gy-5 py-5">
          {allOperations.length > 0 ? (
            allOperations.map(
              (operation) =>
                !operation.isDeleted && (
                  <div className="col-md-6 col-lg-4 " key={operation.id}>
                    <div className="card">
                      <Link to={`/userOperations/${operation.id}`}>
                        <div className="">
                          <img
                            className="card-img-top"
                            src={ship}
                            alt="Title"
                          />
                          <div className="card-body p-3">
                            <h4 className="card-title text-capitalize">
                              {operation.name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
            )
          ) : (
            <p>Loading....</p>
          )}
        </div>
      </div>
    </>
  );
};
