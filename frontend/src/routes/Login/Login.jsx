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
  

  return (
    <div className="login">
         <div className="login-box">
         <h1 className="title">Na Minha Estante</h1>
         <LoginForm/>
         </div>
    </div>
    
  );
};

export default Login;
