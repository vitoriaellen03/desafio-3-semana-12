import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="/" className="logo">
        <img src="../../assets/img/logo.svg" alt="logo for site" />
        <h3>Funiro</h3>
      </Link>
    </>
  );
};

export default Logo;
