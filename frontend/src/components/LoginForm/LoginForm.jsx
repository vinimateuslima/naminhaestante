import { useState } from "react";

//Toast
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

//Axios
import axios from "../../axios-config";

import { login } from "../../services/auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
      };
      console.log(data);
      const res = await axios.post(`users/login`, data);

      login(res.data.token);

      toast.success(res.data.msg);
      console.log(res.data);

      navigate("/")

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleUsername = (e) => {
    let value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <h3>Faça o login</h3>
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
  );
};

export default LoginForm;
