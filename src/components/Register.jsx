import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_auth } from "../helpers/const";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-eye"
    >
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await registerUser(values);
      navigate("/confirmation");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setFieldError("submit", "Ошибка при регистрации");
    } finally {
      setSubmitting(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_auth}/register/`, userData);
      if (response.status === 200) {
        console.log("Регистрация успешна!");
        await sendConfirmationCode(userData.email);
      } else {
        throw new Error("Ошибка при регистрации");
      }
    } catch (error) {
      throw error;
    }
  };

  const sendConfirmationCode = async (email) => {
    try {
      const response = await axios.post(`${API_auth}/email-confirm/`, {
        email,
      });
      if (response.status === 200) {
        console.log("Код подтверждения отправлен успешно!");
      }
    } catch (error) {
      console.error("Ошибка при отправке кода подтверждения:", error);
    }
  };

  const getPasswordValidationMessage = (password) => {
    if (!password || password.trim() === "") return "";
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?!.*\s).{8,15}$/;
    if (!passwordRegex.test(password)) {
      return (
        <>
          <ul
            style={{
              paddingLeft: "20px",
              marginBottom: "0",
              listStyleType: "none",
            }}
          >
            <li>
              от 8 до 15 символов{" "}
              {password.length >= 8 && password.length <= 15 ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              строчные и прописные буквы{" "}
              {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              минимум одна цифра
              {/\d/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
            <li>
              минимум один спецсимвол (!, '', #, $ ...)
              {/[!@#$%^&*()_+}{:;'?/>.<,]/.test(password) ? (
                <span style={{ color: "green" }}>✓</span>
              ) : (
                <span style={{ color: "red" }}>✗</span>
              )}
            </li>
          </ul>
        </>
      );
    }

    return "";
  };

  const getPasswordValidationColor = (password) => {
    const errorMessage = getPasswordValidationMessage(password);
    return errorMessage ? "red" : "green";
  };

  const passwordValidation = (password) => {
    if (!password || password.trim() === "") return true;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?!.*\s).{8,15}$/;
    return passwordRegex.test(password);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Необходим email"),
    username: Yup.string().required("Необходим логин"),
    password: Yup.string()
      .required("Необходим пароль")
      .test("password-validation", passwordValidation),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароль не совпадает")
      .required("Подтверждение пароля обязательно"),
  });

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      position: "relative",
    },
    catCard: {
      width: "300px",
      height: "400px",
      padding: "20px",
      borderRadius: "150px 150px 10px 10px",
      boxShadow: "0 0 10px rgba(2, 2, 2, 0.7)",
      backgroundColor: "#fff",
      position: "relative",
      overflow: "hidden",
    },
    catEar: {
      position: "absolute",
      top: "-40px",
      width: "80px",
      height: "80px",
      background: "#ffc0cb",
      borderRadius: "50%",
      transform: "rotate(45deg)",
      zIndex: "1",
    },
    catEarLeft: {
      left: "-20px",
    },
    catEarRight: {
      right: "-20px",
    },
    catFace: {
      position: "absolute",
      top: "-60px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100px",
      height: "100px",
      background: "#ffc0cb",
      borderRadius: "50%",
    },
    catEyes: {
      position: "absolute",
      top: "25px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px",
      height: "20px",
      background: "#fff",
      borderRadius: "50%",
      zIndex: "2",
    },
    catEye: {
      position: "absolute",
      top: "0",
      width: "20px",
      height: "20px",
      background: "#000",
      borderRadius: "50%",
    },
    catEyeLeft: {
      left: "5px",
    },
    catEyeRight: {
      right: "5px",
    },
    catNose: {
      position: "absolute",
      top: "50px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "20px",
      height: "20px",
      background: "#000",
      borderRadius: "50%",
      zIndex: "2",
    },
    catMouth: {
      position: "absolute",
      top: "60px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px",
      height: "20px",
      borderBottom: "5px solid #000",
      zIndex: "2",
    },
    catPaw: {
      position: "absolute",
      bottom: "0",
      width: "60px",
      height: "30px",
      background: "#ffc0cb",
      borderRadius: "50%",
      transform: "rotate(45deg)",
      zIndex: "1",
    },
    catPawLeft: {
      left: "-20px",
    },
    catPawRight: {
      right: "-20px",
    },
    catTail: {
      position: "absolute",
      bottom: "0",
      right: "50%",
      width: "100px",
      height: "20px",
      background: "#ffc0cb",
      borderRadius: "50%",
      transform: "rotate(45deg)",
      zIndex: "1",
    },
    input: {
      width: "100%",
      height: "45px",
      backgroundColor: "#f8f8f8",
      borderRadius: "7px",
      border: "none",
      marginBottom: "14px",
      paddingLeft: "15px",
      fontSize: "15px",
      boxSizing: "border-box", // Ensure consistent sizing
    },
    button: {
      backgroundColor: "black",
      color: "white",
      width: "100%",
      height: "45px",
      borderRadius: "7px",
      border: "none",
      fontSize: "17px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.catCard}>
        <div style={{ ...styles.catEar, ...styles.catEarLeft }} />
        <div style={{ ...styles.catEar, ...styles.catEarRight }} />
        <div style={styles.catFace} />
        <div style={styles.catEyes}>
          <div style={{ ...styles.catEye, ...styles.catEyeLeft }} />
          <div style={{ ...styles.catEye, ...styles.catEyeRight }} />
        </div>
        <div style={styles.catNose} />
        <div style={styles.catMouth} />
        <div style={{ ...styles.catPaw, ...styles.catPawLeft }} />
        <div style={{ ...styles.catPaw, ...styles.catPawRight }} />
        <div style={styles.catTail} />
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
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
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
                    top: "44%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon />
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
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <Field
                  type={showPassword ? "text" : "password"}
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
                    top: "44%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon />
                </div>
                {touched.password_confirm && errors.password_confirm && (
                  <div style={{ color: "red" }}>{errors.password_confirm}</div>
                )}
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
