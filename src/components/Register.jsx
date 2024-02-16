import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { useAuth } from "../context/AuthContextProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    handleSubmit,
    styles,
    showPassword,
    setShowPassword,
    validationSchema,
    getPasswordValidationColor,
    getPasswordValidationMessage,
  } = useAuth();

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="main__container">
      <div className="card">
        <h2>Регистрация</h2>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            password_confirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Введи адрес почты"
                style={{
                  ...styles.input,
                  borderColor: touched.email && errors.email ? "red" : "",
                }}
              />
              {touched.email && errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
              <Field
                type="text"
                name="username"
                placeholder="Придумай логин"
                style={{
                  ...styles.input,
                  borderColor: touched.username && errors.username ? "red" : "",
                }}
              />
              {touched.username && errors.username && (
                <div style={{ color: "red" }}>{errors.username}</div>
              )}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Создай пароль"
                    style={{
                      ...styles.input,
                      color: getPasswordValidationColor(values.password),
                      borderColor:
                        touched.password && errors.password ? "red" : "",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              {touched.password && errors.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
              <div
                style={{ color: getPasswordValidationColor(values.password) }}
              >
                {getPasswordValidationMessage(values.password)}
              </div>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirm"
                    placeholder="Повтори пароль"
                    style={{
                      ...styles.input,
                      borderColor:
                        touched.password_confirm && errors.password_confirm
                          ? "red"
                          : "",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Иконка для отображения/скрытия пароля */}
                  </div>
                  {touched.password_confirm && errors.password_confirm && (
                    <div style={{ color: "red" }}>
                      {errors.password_confirm}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                style={styles.button}
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </button>
              {errors.submit && <div className="error">{errors.submit}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
