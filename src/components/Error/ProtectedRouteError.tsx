import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const ProtectedRouteError: React.FC = () => {
  return (
    <>
      <div className="error-page">
        <i class='bx bx-lock'></i>
        <h1>Access denied</h1>
        <p>You need to be logged in to access this page. Please <Link to='/login' className='link'>log in.</Link></p>
      </div>
    </>
  );
};

export default ProtectedRouteError;
