import React, { useState, useEffect } from "react";
import HeaderNavBar from '../Header/components/HeaderNavBar.tsx';
import HeaderMain from '../Header/components/HeaderMain.tsx';
import './Header.css';

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsFixed(true); 
    } else {
      setIsFixed(false); 
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`c-header ${isFixed ? 'fixed' : ''}`} id="c-header">
        <HeaderNavBar />
      </header>
      <HeaderMain />
    </>
  );
};

export default Header;
