import React, { useState, createContext, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_auth } from "../helpers/const";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //! REGISTER
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
    input: {
      width: "300px",
      height: "45px",
      backgroundColor: "#f8f8f8",
      borderRadius: "7px",
      border: "none",
      marginBottom: "14px",
      paddingLeft: "15px",
      fontSize: "15px",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      width: "320px",
      height: "45px",
      borderRadius: "7px",
      border: "none",
      fontSize: "17px",
    },
  };

  const values = {
    handleSubmit,
    styles,
    showPassword,
    setShowPassword,
    validationSchema,
    EyeIcon,
    getPasswordValidationColor,
    getPasswordValidationMessage,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
