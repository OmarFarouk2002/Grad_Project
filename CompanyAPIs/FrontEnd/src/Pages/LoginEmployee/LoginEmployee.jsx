import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import "./../SignUp/SiginUp.css";

export const LoginEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserToken, handleLogin } = useContext(authContext);

  async function handleSubmit(values) {
    setIsLoading(true);
    const { data, status } = await handleLogin(values);
    setError(null);

    if (status === 400) {
      setIsLoading(false);
      setError(data);
    } else if (status === 200) {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("firstName", values.firstName);
      localStorage.setItem("lastName", values.lastName);
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

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="vh-100 bg-main overflow-auto authForm container-fluid ">
    <div className="row justify-content-lg-end justify-content-center align-content-center bg-black bg-opacity-25  pt-5 h-100  ">
      <form
        onSubmit={formik.handleSubmit}
        className="col-lg-5 col-11 py-5 px-5 mt-4 me-3"
      >
          <h2>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}

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

          <div className="row mt-4 justify-content-center">
            <button type="submit" className="btn btn-custom col-8 mx-auto">
              {isLoading ? <span>Loading ....</span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
