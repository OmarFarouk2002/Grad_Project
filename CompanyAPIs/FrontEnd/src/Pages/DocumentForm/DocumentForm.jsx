import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { documentContext } from "../../Context/DocumentsContext";
import { toast } from "react-hot-toast";
import document from "./../../assets/images/document.jpeg";
export const DocumentForm = () => {
  const navigate = useNavigate();
  let { operationId } = useParams();
  const { addEditNewDocument } = useContext(documentContext);
  const { state: data } = useLocation();
  const [ships, setShips] = useState([]);

  async function getAllShips() {
    const { data } = await axios.get(
      "https://companygradution.runasp.net/api/Auth/Ships"
    );
    setShips(data.data);
  }

  useEffect(() => {
    getAllShips();
  }, []);

  async function addDocument(values) {
    const { data, status } = await addEditNewDocument({
      ...values,
      operationID: operationId,
    });
    if (status === 200) {
      toast.success("Document added successfully");
      navigate("/operation");
    }
  }
  function handleSubmit(values) {
    data
      ? addDocument({ ...values, id: data.documents.id })
      : addDocument(values);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    voyageNumber: Yup.string().required(),
    containerNumber: Yup.string().required(),
    shipID: Yup.string().required(),
  });
  const initialValues = {
    name: data ? data.documents.name : "",
    voyageNumber: data ? data.documents.voyageNumber : "",
    containerNumber: data ? data.documents.containerNumber : "",
    shipID: data ? data.documents.shipID : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Document</h2>
        </div>
      </header>
      <div className="mt-5">
        <div className="container-fluid px-5 mt-5">
          <div className="row align-items-center  p-5">
            <div className="col-md-6">
              <form onSubmit={formik.handleSubmit} className=" p-5 mt-4">
                <h2>Create Document</h2>
                <div className="my-3">
                  <label htmlFor="Name" className="form-label">
                    Document Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <small className="text-danger mt-1">
                      {formik.errors.name}
                    </small>
                  )}{" "}
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="voyageNumber" className="form-label">
                      Voyage Number
                    </label>
                    <input
                      type="number"
                      name="voyageNumber"
                      id="voyageNumber"
                      className="form-control"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.voyageNumber}
                    />
                    {formik.errors.voyageNumber &&
                      formik.touched.voyageNumber && (
                        <small className="text-danger mt-1">
                          {formik.errors.voyageNumber}
                        </small>
                      )}{" "}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="containerNumber" className="form-label">
                      Container Number
                    </label>
                    <input
                      type="number"
                      name="containerNumber"
                      id="containerNumber"
                      className="form-control"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.containerNumber}
                    />
                    {formik.errors.containerNumber &&
                      formik.touched.containerNumber && (
                        <small className="text-danger mt-1">
                          {formik.errors.containerNumber}
                        </small>
                      )}{" "}
                  </div>
                </div>
                <div className="mb-3 ">
                  <label htmlFor="shipID" className="form-label">
                    Ship Name
                  </label>
                  <select
                    className="form-select"
                    id="shipID"
                    name="shipID"
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a Ship</option>
                    {ships.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.shipID && formik.touched.shipID && (
                    <small className="text-danger mt-1">
                      {formik.errors.shipID}
                    </small>
                  )}{" "}
                </div>

                <button type="submit" className="btn btn-outline-custom  ">
                  create
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={document} className="w-100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
