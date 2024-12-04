import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src="../../assets/img/logo.svg" alt="logo for site" />
        <h3>Funiro</h3>
      </Link>
    </div>
  );
};

export default Logo;
