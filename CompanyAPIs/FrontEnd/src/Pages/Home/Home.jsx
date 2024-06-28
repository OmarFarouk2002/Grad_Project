import React, { useContext } from "react";
import "./Home.css";
import aboutImg from "./../../assets/images/about us 2.jpg";
import cont10 from "./../../assets/images/about us.png";
import cont20 from "./../../assets/images/20.jpeg";
import cont30 from "./../../assets/images/40.jpeg";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export const Home = () => {
  const { userToken } = useContext(authContext);

  return (
    <div>
      <header>
        <div className="content h-100 bg-black bg-opacity-50">
          <div className="container  h-100 d-flex flex-column justify-content-center align-items-center ">
            {userToken ? (
              <div className="w-50">
                {localStorage.getItem("userRole") === "EMPLOYEE" && (
                  <Link
                    to="/operation"
                    className="btn btn-custom w-100 py-3 fw-semibold fs-3"
                  >
                    Operations
                  </Link>
                )}
                {localStorage.getItem("userRole") === "user" && (
                  <Link
                    to="/userOperations"
                    className="btn btn-custom w-100 py-3 fw-semibold fs-4 text-uppercase"
                  >
                    Operations
                  </Link>
                )}
              </div>
            ) : (
              <>
                <Link
                  data-aos="fade-right"
                  to="/loginforuser"
                  className="btn btn-custom col-2 py-3 my-3 fw-semibold"
                >
                  USER
                </Link>
                <Link
                  data-aos="fade-left"
                  to="/loginforEmployee"
                  className="btn btn-custom col-3 py-3 fw-semibold"
                >
                  EMPLOYEE
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <section className="about my-5 py-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6" data-aos="fade-right">
              <div className="about-content">
                <h2 className="text-uppercase fw-bolder position-relative pb-4">
                  why water transportation ?
                </h2>
                <p className="lead mt-4">
                  Water transport is without a doubt the cheapest mode of
                  transport, and very suitable for heavy or bulky goods that
                  need to be transported over long distances where time is not
                  an important factor. Safety and security of goods in transit
                  also influence which mode of transport to use. Land transport
                  by truck may be preferred to railway transport because your
                  losses are generally less. Water transport exposes the goods
                  to the perils of the sea; hence from a safety point of view,
                  sea transport is the most risky. Also, to protect the goods in
                  transit, certain types of packaging are recommended, which
                  might influence costs. Goods may also require special
                  facilities such as refrigeration or special security measures
                  that need to be taken into consideration.
                </p>
              </div>
            </div>
            <div className="col-md-5" data-aos="fade-left">
              <div className="about-img">
                <img src={aboutImg} className="w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5 services">
        <div className="services-content h-100 bg-black bg-opacity-50 pt-5">
          <h2
            className="text-uppercase text-center   position-relative pb-4 "
            data-aos="fade-up"
          >
            How we can help you
          </h2>
          <div className="container mt-5">
            <div className="row justify-content-between">
              <div className="col-md-4" data-aos="fade-right">
                <div className="services-item text-white">
                  <div className="icon bg-main rounded-circle text-white d-flex align-items-center justify-content-center fs-3">
                    <h3>1</h3>
                  </div>
                  <h4 className="my-4">Saving Your Time</h4>
                  <p>
                    <i className="fa-solid fa-check fs-4 me-2"></i> Tracing
                    Shipment
                  </p>
                  <p>
                    <i className="fa-solid fa-check fs-4 me-2"></i> Receiving
                    Your invoices Faster
                  </p>{" "}
                  <p>
                    <i className="fa-solid fa-check fs-4 me-2"></i> Online
                    Payment
                  </p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-left">
                <div className="services-item text-white">
                  <div className="icon bg-main rounded-circle text-white d-flex align-items-center justify-content-center fs-3">
                    <h3>2</h3>
                  </div>
                  <h4 className="my-4">
                    Make Your Payment Payment Process Easier And Faster
                  </h4>
                  <p>
                    <i className="fa-solid fa-check fs-4 me-2"></i>
                    Cash at our company
                  </p>
                  <p>
                    <i className="fa-solid fa-check fs-4 me-2"></i>Credit Card
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5  containers py-5">
        <div className="container">
          <h2 className="position-relative text-center pb-3" data-aos="fade-up">
            Container Types
          </h2>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="container-item">
                <img src={cont20} alt="" className="w-100 mb-4" height={350} style={{objectFit:'cover'}}   />
                <p className="h5">20 FLAT TOP</p>
                <p>Capacity (32.5 cbm / 1,149 cbft)</p>

                <p>ISO Type Group (22 UT)</p>
                <p>ISO Size Type (22 U1)</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="container-item">
                <img src={cont10} alt="" className="w-100 mb-4" height={350} />
                <p className="h5">REFERS</p>
                <p>ISO Type Group (22 PC)</p>
                <p>ISO Size Type (22 P3) .</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="container-item">
                <img src={cont30} alt="" className="w-100 mb-4" height={350} style={{objectFit:'cover'}} />
                <p className="h5">40 FLAT TOP</p>
                <p>Capacity (66.8 cbm / 2,359 cbft)</p>

                <p>ISO Type Group (42 UT)</p>
                <p>ISO Size Type (42 U1)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
