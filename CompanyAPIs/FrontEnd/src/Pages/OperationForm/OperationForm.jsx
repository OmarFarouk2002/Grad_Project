import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { operationContext } from "./../../Context/OperationsContext";
import toast from "react-hot-toast";
import axios from "axios";
import operation from "./../../assets/images/operation.jpeg";
export const OperationForm = () => {
  const navigate = useNavigate();
  const { addNewOperation } = useContext(operationContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state: data } = useLocation();
  const [allUsers, setAllUsers] = useState([]);

  async function addOperation(values) {
    const { data, status } = await addNewOperation({
      ...values,
      userId: localStorage.getItem("currentUserId"),
    });
    if (status === 200) {
      toast.success("Operation added successfully");
      navigate("/operation");
    }
  }
  async function getUsers() {
    const { data } = await axios.get(
      `https://companygradution.runasp.net/api/Auth/Users`
    );
    setAllUsers(data.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleSubmit(values) {
    data ? addOperation({ ...values, id: data.id }) : addOperation(values);
    navigate("/operation");
  }
  const validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    portOfLoading: Yup.string().required(),
    portOfDistance: Yup.string().required(),
    numberOfCases: Yup.string().required(),
    numberOfUnits: Yup.string().required(),
    totalWeight: Yup.string().required(),
    employeeId: Yup.string().required(),
  });
  const initialValues = {
    name: data ? data.name : "",
    portOfLoading: data ? data.portOfLoading : "",
    portOfDistance: data ? data.portOfDistance : "",
    numberOfCases: data ? data.numberOfCases : "",
    numberOfUnits: data ? data.numberOfUnits : "",
    totalWeight: data ? data.totalWeight : "",
    employeeId: data ? data.employeeId : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const dropdownOptions = [
    { value: "Egypt", label: "Egypt" },
    { value: "Italy", label: "Italy" },
    { value: "Albania", label: "Albania" },
    { value: "Brazil", label: "Brazil" },
    { value: "Canada", label: "Canada" },
    { value: "German", label: "German" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" },
    { value: "Kuwait", label: "Kuwait" },
  ];

  return (
    <div className=" ">
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Create Operation</h2>
        </div>
      </header>
      <div className="container-fluid px-5 mt-5">
        <div className="row align-items-center  p-5">
          <div className="col-md-6">
            <form
              onSubmit={formik.handleSubmit}
              className="   ms-auto me-3 py-5 px-5 mt-4"
            >
              <h2 className="mb-3">Create Operation</h2>
              <div className="row">
                <div className="my-3 col-md-6">
                  <label htmlFor="name" className="form-label ">
                    Operation Name
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
                <div className="my-3 col-md-6">
                  <label htmlFor="name" className="form-label ">
                    Assigned User
                  </label>
                  <select
                    className="form-select"
                    id="employeeId"
                    name="employeeId"
                    onChange={formik.handleChange}
                  >
                    <option value="">Select user</option>
                    {allUsers.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.employeeId && formik.touched.employeeId && (
                    <small className="text-danger mt-1">
                      {formik.errors.employeeId}
                    </small>
                  )}{" "}
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="portOfLoading" className="form-label ">
                    port Of Loading
                  </label>
                  <select
                    className="form-select"
                    id="portOfLoading"
                    name="portOfLoading"
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Country</option>
                    {dropdownOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={formik.values.portOfDistance === option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formik.errors.portOfLoading &&
                    formik.touched.portOfLoading && (
                      <small className="text-danger mt-1">
                        {formik.errors.portOfLoading}
                      </small>
                    )}{" "}
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="portOfDistance" className="form-label ">
                    port Of Distance
                  </label>
                  <select
                    className="form-select"
                    id="portOfDistance"
                    name="portOfDistance"
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Country</option>
                    {dropdownOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={formik.values.portOfLoading === option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formik.errors.portOfDistance &&
                    formik.touched.portOfDistance && (
                      <small className="text-danger mt-1">
                        {formik.errors.portOfDistance}
                      </small>
                    )}{" "}
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="numberOfCases" className="form-label ">
                    Number Of Cases
                  </label>
                  <input
                    type="number"
                    name="numberOfCases"
                    id="numberOfCases"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.numberOfCases}
                  />
                  {formik.errors.numberOfCases &&
                    formik.touched.numberOfCases && (
                      <small className="text-danger mt-1">
                        {formik.errors.numberOfCases}
                      </small>
                    )}{" "}
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="numberOfUnits" className="form-label ">
                    Number Of Units
                  </label>
                  <input
                    type="number"
                    name="numberOfUnits"
                    id="numberOfUnits"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.numberOfUnits}
                  />
                  {formik.errors.numberOfUnits &&
                    formik.touched.numberOfUnits && (
                      <small className="text-danger mt-1">
                        {formik.errors.numberOfUnits}
                      </small>
                    )}{" "}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="totalWeight" className="form-label ">
                  Total Weight
                </label>
                <input
                  type="number"
                  name="totalWeight"
                  id="totalWeight"
                  className="form-control"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.totalWeight}
                />
                {formik.errors.totalWeight && formik.touched.totalWeight && (
                  <small className="text-danger mt-1">
                    {formik.errors.totalWeight}
                  </small>
                )}{" "}
              </div>
              <button type="submit" className="btn btn-outline-custom  ">
                {isLoading ? (
                  <span>Loading ....</span>
                ) : data ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <img src={operation} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
