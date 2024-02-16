import React, { useState } from "react";
import axios from "axios";
import { API_auth } from "../helpers/const";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_auth}/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Неверный логин или пароль:", error);
      setError("Неверный логин или пароль");
    }
  };

  const cardStyles = {
    width: "300px",
    margin: "20px auto",
    padding: "40px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyles = {
    width: "280px",
    height: "40px",
    marginBottom: "10px",
    padding: "0 10px",
    fontSize: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyles = {
    width: "300px",
    height: "40px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const eyeIconStyles = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  const errorStyles = {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  };

  return (
    <div style={cardStyles}>
      {error && <div style={errorStyles}>{error}</div>}
      <div>
        <h2>Авторизация</h2>
      </div>
      <input
        type="username"
        placeholder="Введи логин"
        style={inputStyles}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Введи пароль"
          style={inputStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={eyeIconStyles}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <button style={buttonStyles} onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
};

export default Auth;
