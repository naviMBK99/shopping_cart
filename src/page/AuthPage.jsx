import React, { useState } from "react";
import Register from "../components/Register";
import Auth from "../components/Auth";
import Confirmation from "../components/Confirmation";

const AuthPage = () => {
  const [step, setStep] = useState("/register");

  const handleRegisterSuccess = () => {
    setStep("/confirmation");
  };

  const handleConfirmationSuccess = () => {
    setStep("/auth");
  };

  return (
    <div>
      {step === "/register" && <Register onSuccess={handleRegisterSuccess} />}
      {step === "/confirmation" && (
        <Confirmation onSuccess={handleConfirmationSuccess} />
      )}
      {step === "/auth" && <Auth />}
    </div>
  );
};

export default AuthPage;
