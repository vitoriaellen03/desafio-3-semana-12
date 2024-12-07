import React, { useEffect } from 'react';
import 'boxicons';
import CartAddProduct from '../../CartAddProducts/CartAddProducts';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const UserDeviceLinks = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Verifica se o usuário está logado ou se há informações no localStorage
  const isLoggedIn = user || localStorage.getItem('isLoggedIn') === 'true';

  // Função que armazena as informações do login no localStorage
  const storeUserLoginInfo = (userData) => {
    const loginInfo = {
      id: userData.id,
      email: userData.email,
      password: userData.password,
    };
    localStorage.setItem('userLoginInfo', JSON.stringify(loginInfo));
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Função de logout que remove as informações do localStorage
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userLoginInfo');
    signOut();
    navigate('/');
  };

  // Efeito para armazenar as informações de login quando o usuário for autenticado
  useEffect(() => {
    if (user) {
      storeUserLoginInfo({
        id: user.id,
        email: user.email,
        password: '@Senha123', // Você pode substituir isso com a senha verdadeira, se disponível.
      });
    }
  }, [user]);

  return (
    <div className="devices">
      <ul className="devices-links">
        {isLoggedIn ? (
          <li className="dvc">
            <button onClick={handleLogout}>
              <i className='bx bx-log-out' style={{ color: '#333333' }}></i>
            </button>
          </li>
        ) : (
          <li className="dvc">
            <Link to="/login">
              <img src="../../assets/img/user.svg" alt="user-login" />
            </Link>
          </li>
        )}
        <li className="dvc">
          <CartAddProduct />
        </li>
      </ul>
    </div>
  );
};

export default UserDeviceLinks;
