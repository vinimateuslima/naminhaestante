import "./Login.css";

import { useState } from "react";

import logo from "../../assets/img/logo-naminhaestante.png";

//Axios
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
        <h1 className="title"><img src={logo} alt="" /></h1>
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
