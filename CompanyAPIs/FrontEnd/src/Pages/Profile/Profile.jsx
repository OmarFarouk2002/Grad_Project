import React from "react";
import "./Profile.css";
import avatar from "./../../assets/images/avatar.jpg";
export const Profile = () => {
  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Profile </h2>
        </div>
      </header>
      <div className="container mt-5   profile">
        <div className="row bg-white rounded  align-items-center  my-5 py-5">
          <div className="col-md-5 text-center">
            <img src={avatar} alt="" className="w-50 " />
          </div>
          <div className="col-md-7">
            <div className="profile-card p-4">
              <p>
                <span className="fw-bold"> Name : </span> Esraa ismail
              </p>
              <p>
                <span className="fw-bold"> Phone :</span> 01204840567
              </p>
              <p>
                <span className="fw-bold"> Role :</span>{" "}
                {localStorage.getItem("userRole")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
