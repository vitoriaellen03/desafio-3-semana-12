import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserDeviceLinks from './UserDeviceLinks';

const HeaderNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const isActive = windowWidth <= 768 ? isMenuOpen : false;

  return (
    <div className="header-navbar sec-conteiner">
      <section>
        <Logo />
      </section>
      <section>
        <div className="navigator-menu">
          <div
            className={`hamburger ${isActive ? 'active' : 'default'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          ></div>
          <nav className={`nav-menu ${isActive ? 'active' : 'hidden'}`}>
            <ul>
              <NavLinks />
            </ul>
          </nav>
        </div>
      </section>
      <section>
        <UserDeviceLinks />
      </section>
    </div>
  );
};

export default HeaderNavbar;
