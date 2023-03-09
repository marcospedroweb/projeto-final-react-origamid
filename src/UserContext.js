import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';

//Cria-se um contexto e exporta-o. Iremos chamar ele nos componente que precisarmos dos dados globais
export const UserContext = React.createContext();

//Aqui no (UserStorage) é onde ficara e sera exportado toda função e variavel que quero que seja global
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      // Logout na conta do usuario
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  React.useEffect(() => {
    // Se exister token, realiza o login automatico
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    // Realiza o login, com usuario e senha
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      console.log(tokenRes);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // Todos os "Filhos" dentro do Context Provider terá acesso o contexto global
  // No caso, terá acesso a tudo que está dentro do objeto em value
  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
