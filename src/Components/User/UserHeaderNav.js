import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
  // Variavel para verificar se a tela é mobile ou não
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav className={styles.nav}>
      {/* Esse "end" é um metodo do react que adiciona a class "active" no elemento que você clicou*/}
      <NavLink to="/conta" end>
        {/* Esse "oomponente" é um svg  */}
        <MinhasFotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        {/* Esse "oomponente" é um svg  */}
        <Estatisticas />
        {mobile && 'Estatísticas'}
      </NavLink>
      <NavLink to="/conta/postar">
        {/* Esse "oomponente" é um svg  */}
        <AdicionarFoto />
        {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={userLogout}>
        {/* Esse "oomponente" é um svg  */}
        <Sair />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
