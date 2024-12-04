import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserDeviceLinks from './UserDeviceLinks';

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
        <Logo />
      </section>
      <section>
        <div className="navgator-menu">
          <NavLinks />
        </div>
      </section>
      <section>
        <UserDeviceLinks />
      </section>
    </div>
  );
};

export default HeaderNavbar;
