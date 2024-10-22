import { Navigate, Outlet, useLocation  } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation(); // Hook para monitorar mudanças de rota

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated(); // Espera o resultado da verificação
      setIsAuth(authStatus); // Atualiza o estado com o resultado da autenticação
    };
    checkAuth();
  }, [location]);

  if (isAuth === null) {
    // Exibe um loading ou nada enquanto a verificação é realizada
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet/> : <Navigate to="/login" />;
};
export default PrivateRoute;
