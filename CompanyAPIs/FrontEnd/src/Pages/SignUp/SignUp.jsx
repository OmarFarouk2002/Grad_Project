import React, { useContext, useState } from "react";
import "./SiginUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

export const SignUp = () => {
  let navigate = useNavigate();
  const { handleRegister, setUserToken } = useContext(authContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {
    setIsLoading(true);
    const { data, status } = await handleRegister(values);
    setError(null);
    if (status === 400) {
      setIsLoading(false);
      setError(data);
    } else if (status === 200) {
      localStorage.setItem("firstName", values.firstName);
      localStorage.setItem("lastName", values.lastName);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setIsLoading(false);
      setError(null);
      navigate("/");
      localStorage.setItem("userRole", data.roles);
      localStorage.setItem("currentUserId", data.userID);
    } else {
      setError(data);
    }
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required().min(3),
    lastName: Yup.string().required().min(3),
    userName: Yup.string().required().min(3),
    email: Yup.string().required().email(),
    phone: Yup.string().required().matches(phoneRegExp, "invalid phone number"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")]),
    password: Yup.string().required(),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    isEmployee: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="vh-100 bg-main overflow-auto authForm ">
      <div className="w-75 ms-auto  ">
        <form
          onSubmit={formik.handleSubmit}
          className="w-50  ms-auto me-3 py-3 px-5 mt-5"
        >
          <h2>SignUp</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row mt-4 justify-content-between">
            <div className="mb-1 col-lg-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <small className="text-danger">{formik.errors.firstName}</small>
              )}{" "}
            </div>
            <div className="mb-1 col-lg-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <small className="text-danger">{formik.errors.lastName}</small>
              )}{" "}
            </div>
          </div>
          <div className="mb-1">
            <label htmlFor="userName" className="form-label">
              UserName
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.errors.userName && formik.touched.userName && (
              <small className="text-danger">{formik.errors.userName}</small>
            )}{" "}
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}{" "}
          </div>
          <div className="mb-1">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <small className="text-danger">{formik.errors.phone}</small>
            )}{" "}
          </div>
          <div className="row mt-2  justify-content-between">
            <div className="mb-1   col-lg-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <small className="text-danger">{formik.errors.password}</small>
              )}{" "}
            </div>
            <div className="mb-1 col-lg-6">
              <label htmlFor="rePassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rePassword}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <small className="text-danger">
                  {formik.errors.rePassword}
                </small>
              )}{" "}
            </div>
          </div>
          <div className="row mt-3 justify-content-center">
            <button type="submit" className="btn btn-custom w-75 mx-auto">
              {isLoading ? <span>Loading ....</span> : "Sign Up"}
            </button>
            {/* <p className="w-100 text-center mt-2">
              Have already account ? <Link to="/login"> Login</Link>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
};
