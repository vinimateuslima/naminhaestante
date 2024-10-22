import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios-config"; // Importa sua configuração do Axios
import { getToken } from "../services/auth"; // Função para pegar o token

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken(); // Pega o token do localStorage

      if (token) {
        try {
          const res = await axios.get(`/users/checkAuth`);
          setUser(res.data.user); // Armazena os dados do usuário no estado
        } catch (error) {
          console.error("Erro ao buscar o usuário:", error);
        }
      }

      setLoading(false); // Finaliza o estado de carregamento
    };

    fetchUser(); // Chama a função para buscar o usuário
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o UserContext
export const useUser = () => {
  return useContext(UserContext);
};
