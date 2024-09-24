import "./Login.css";

import { useState } from "react";

//Toast
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Axios
import axios from "../../axios-config";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

const Login = () => {
  const [possuiConta, setPossuiConta] = useState(true);

  const togglePossuiConta = () => {
    setPossuiConta((prevMode) => !prevMode); // Troca entre login e registro
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="title">Na Minha Estante</h1>
        {possuiConta ? (
          <>
            <LoginForm />
            <button className="btn-conta" onClick={togglePossuiConta}>
              Não possui uma conta? Cadastre-se
            </button>
          </>
        ) : (
          <>
            <SignupForm />
            <button className="btn-conta" onClick={togglePossuiConta}>
              Já possui uma conta? Faça login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
