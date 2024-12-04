import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

const HeaderNavbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const isLoggedIn = user || localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    signOut();
    window.location.href = '/'; 
  };

  return (
    <div className="header-navbar">
      <section>
        <div className="logo">
          <Link to="/">
            <img src="../../assets/img/logo.svg" alt="logo for site" />
            <h3>Funiro</h3>
          </Link>
        </div>
      </section>
      <section>
        <div className="navgator-menu">
          <ul className="options-links">
            <li className="link"><Link to="/">Home</Link></li>
            <li className="link"><Link to="/shop">Shop</Link></li>
            <li className="link"><Link to="/">About</Link></li>
            <li className="link"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </section>
      <section>
        <div className="devices">
          <ul className="devices-links">
            {isLoggedIn ? (
              <li className="dvc">
                <button onClick={handleLogout}>
                <box-icon name='log-out'></box-icon>
                </button>
              </li>
            ) : (
              <li className="dvc"><Link to="/login"><img src="../../assets/img/user.svg" alt="user-login" /></Link></li>
            )}
            <li className="dvc"><Link to="/cart"><img src="../../assets/img/cart.svg" alt="cart" /></Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HeaderNavbar;
