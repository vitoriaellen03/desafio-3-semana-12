import React from "react";
import HeaderNavBar from '../Header/components/HeaderNavBar.tsx';
import HeaderMain from '../Header/components/HeaderMain.tsx';
import './Header.css';

const Header = () => {
  return (
    <>
      <header className="c-header" id="c-header">
        <HeaderNavBar />
      </header>
      <HeaderMain />
    </>
  );
};

export default Header;
