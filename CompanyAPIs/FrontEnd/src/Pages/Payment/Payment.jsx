import React from "react";
import payment from "./../../assets/images/payment.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const paySchema = Yup.object({
    cardNumber: Yup.string()
      .min(19, "Invalid card number")
      .required("Card number is required"),

    // expiryDate: Yup.string().required("Expiry date is required"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .test("valid-month", "Invalid month", function (value) {
        if (!value) {
          return false;
        }

        const [month] = value.split("/").map((item) => parseInt(item, 10));

        return month >= 1 && month <= 12;
      })
      .test(
        "is-future-date",
        "Expiry date must be in the future",
        function (value) {
          if (!value) {
            return false;
          }

          const currentDate = new Date();
          const [month, year] = value
            .split("/")
            .map((item) => parseInt(item, 10));

          // Adding 1 to the month because JavaScript months are zero-indexed
          const expiryDate = new Date(year + 2000, month, 1);

          return expiryDate > currentDate;
        }
      ),
    name: Yup.string().required("Name is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "Invalid CVV")
      .required("CVV is required"),
  });

  async function handlePayment() {
    const { status } = await axios.post(
      "https://companygradution.runasp.net/api/Documents/AddPayment",
      {
        operationID: data.operationId,
        paymentValue: data.total,
      }
    );
    if (status === 200) {
      toast.success("Payment done successfully");
      navigate("/userOperations");
    } else {
      console.log("no");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: paySchema,
    onSubmit: handlePayment,
  });

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Limit to four numeric characters
    const formattedValue = numericValue.slice(0, 4);

    // Add the '/' separator after the first two characters
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + " / " + formattedValue.slice(2);
    } else {
      return formattedValue;
    }
  };

  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-dark bg-opacity-75 h-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="my-5 text-white"> Payment</h1>
        </div>
      </header>
      <div className="py-5 mt-5 container">
        <div className=" d-flex  justify-content-between align-content-center mt-5">
          <div className="col-md-6">
            <div>
              {" "}
              <img src={payment} className="w-100" alt="" />
            </div>
          </div>
          <form className="col-md-5 p-4 payment" onSubmit={formik.handleSubmit}>
            <h4 className="mb-4 text-center mt-3">Pay With Card</h4>{" "}
            <div className="d-flex justify-content-end  align-items-center">
              <h6 className="mb-0">Total : </h6> {data.total}
            </div>
            <div class="mb-4">
              <label htmlFor="name" className="form-label">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="e.g John Smith"
                aria-describedby="helpId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <small className="text-danger">{formik.errors.name}</small>
              )}{" "}
            </div>
            <div class="mb-4">
              <label htmlFor="name" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                className="form-control"
                placeholder="e.g 1234 1234 1234 1234"
                aria-describedby="helpId"
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value);
                  formik.handleChange(e);
                }}
                value={formik.values.cardNumber}
                onBlur={formik.handleBlur}
                maxLength={19}
              />
              {formik.touched.cardNumber &&
                Boolean(formik.errors.cardNumber) &&
                formik.errors.cardNumber && (
                  <small className="text-danger">
                    {formik.errors.cardNumber}
                  </small>
                )}{" "}
            </div>
            <div className="d-flex mb-4 justify-content">
              <div className="col-md-4">
                <div class="mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    className="form-control"
                    placeholder="MM/YY"
                    aria-describedby="helpId"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      e.target.value = formatExpiryDate(e.target.value);
                      formik.handleChange(e);
                    }}
                    value={formik.values.expiryDate}
                  />
                  {formik.errors.expiryDate &&
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate) && (
                      <small className="text-danger">
                        {formik.errors.expiryDate}
                      </small>
                    )}{" "}
                </div>
              </div>
              <div className="col-md-3 mx-5">
                <div class="mb-3">
                  <label htmlFor="name" className="form-label">
                    CVV
                  </label>
                  <input
                    type="number"
                    name="cvv"
                    id="cvv"
                    className="form-control"
                    placeholder="e.g 1234"
                    aria-describedby="helpId"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.cvv}
                  />
                  {formik.errors.cvv && formik.touched.cvv && (
                    <small className="text-danger">{formik.errors.cvv}</small>
                  )}{" "}
                </div>
              </div>
            </div>
            <div className="w-75 mx-auto text-center">
              {" "}
              <button className="btn btn-outline-custom w-100 mx-auto">PAY</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
