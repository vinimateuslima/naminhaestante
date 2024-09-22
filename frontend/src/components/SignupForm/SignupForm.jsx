import './SignupForm.css'

import { useState } from "react";

//Toast
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Axios
import axios from "../../axios-config";

const SignupForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async () => {
      try {
        const data = {
          username: username,
          email: email,
          passwordHash: password,
        };
  
        const res = await axios.post("users/", data, {
          "Content-Type": "application/json",
        });
        toast.success(res.data.msg);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    };
  
    const handleUsername = (e) => {
      let value = e.target.value;
      setUsername(value);
    };
  
    const handleEmail = (e) => {
      let value = e.target.value;
      setEmail(value);
    };
  
    const handlePassword = (e) => {
      let value = e.target.value;
      setPassword(value);
    };


  return ( 
    <form onSubmit={handleLogin}>
          <input
            type="text"
            name=""
            id="username"
            maxLength="15"
            value={username}
            onChange={handleUsername}
            placeholder="Usuário"
            required
          />
          <input
            type="email"
            name=""
            id="email"
            maxLength="15"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name=""
            id="password"
            maxLength="8"
            value={password}
            onChange={handlePassword}
            placeholder="Senha"
            required
          />
          <input className="btn-login" type="submit" value="Entrar" />
        </form>
  )
}

export default SignupForm