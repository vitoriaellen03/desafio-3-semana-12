import React from 'react';
import 'boxicons';
import CartAddProduct from '../../CartAddProducts/CartAddProducts';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const UserDeviceLinks = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const isLoggedIn = user || localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    signOut();
    window.location.href = '/';
  };

  return (
    <div className="devices">
      <ul className="devices-links">
        {isLoggedIn ? (
          <li className="dvc">
            <button onClick={handleLogout}>
              <box-icon name='log-out'></box-icon>
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
