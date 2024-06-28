import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

import "./../SignUp/SiginUp.css";

export const Login = () => {
  // const { handleLogin } = useContext(authContext);
  async function handleSubmit(values) {
    //   const { data } = await handleLogin(values);
    console.log(values);
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
    <div className="vh-100 bg-main overflow-auto authForm">
      <div className="w-75 ms-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-50  ms-auto me-3 py-3 px-5 mt-4"
        >
          <h2>Login</h2>

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

          <div className="row mt-3 justify-content-center">
            <button
              type="submit"
              className="btn btn-outline-primary text-black w-75 mx-auto"
            >
              SignUp
            </button>
            <p className="w-100 text-center mt-2">
              Create a new account !<Link to="/signup"> SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
