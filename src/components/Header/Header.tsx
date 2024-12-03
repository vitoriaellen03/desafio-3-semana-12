import React from "react";
import HeaderNavBar from '../Header/components/HeaderNavBar.tsx';
import HeaderMain from '../Header/components/HeaderMain.tsx';

const Header = () => {
  return (
    <header className="c-header" id="c-header">
      <HeaderNavBar />
      <HeaderMain />
    </header>
  );
};

export default Header;
