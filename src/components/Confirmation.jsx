import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { API_auth } from "../helpers/const";

const Confirmation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleConfirmation = async (values) => {
    try {
      const response = await axios.post(
        `${API_auth}/email-confirm/`,
        {
          code: `${values.firstDigit}${values.secondDigit}${values.thirdDigit}${values.fourthDigit}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Код подтвержден успешно!");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setError("Неверный код");
    }
  };

  const validationSchema = Yup.object().shape({
    firstDigit: Yup.string().required(""),
    secondDigit: Yup.string().required(""),
    thirdDigit: Yup.string().required(""),
    fourthDigit: Yup.string().required(""),
  });

  return (
    <div style={{ marginTop: "210px" }}>
      <p
        style={{ fontSize: "25px", margin: "0px", marginLeft: "5px" }}
        className="content__right-p"
      >
        Введи 4-значный код,
      </p>
      <p style={{ fontSize: "25px", margin: "0px", marginLeft: "50px" }}>
        {" "}
        высланный на
      </p>
      <p style={{ fontSize: "25px", margin: "0px", marginLeft: "17px" }}>
        example@gmail.com
      </p>
      <Formik
        initialValues={{
          firstDigit: "",
          secondDigit: "",
          thirdDigit: "",
          fourthDigit: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleConfirmation}
      >
        {({ isValid }) => (
          <Form style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "280px",
                marginTop: "30px",
              }}
            >
              <Field
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "60px",
                  backgroundColor: "#f8f8f8",
                  border: error ? "1px solid red" : "none",
                  borderRadius: "10px",
                }}
                type="text"
                name="firstDigit"
              />
              <Field
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "60px",
                  backgroundColor: "#f8f8f8",
                  border: error ? "1px solid red" : "none",
                  borderRadius: "10px",
                }}
                type="text"
                name="secondDigit"
              />
              <Field
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "60px",
                  backgroundColor: "#f8f8f8",
                  border: error ? "1px solid red" : "none",
                  borderRadius: "10px",
                }}
                type="text"
                name="thirdDigit"
              />
              <Field
                style={{
                  width: "40px",
                  height: "40px",
                  lineHeight: "60px",
                  backgroundColor: "#f8f8f8",
                  border: error ? "1px solid red" : "none",
                  borderRadius: "10px",
                }}
                type="text"
                name="fourthDigit"
              />
            </div>
            {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}
            <button
              className="confirm-btn"
              style={{
                backgroundColor: "#D7D7D7",
                color: "#767676",
                marginTop: "30px",
                width: "280px",
                height: "40px",
                border: "none",
                borderRadius: "7px",
              }}
              type="submit"
              disabled={!isValid}
            >
              Подтвердить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Confirmation;
