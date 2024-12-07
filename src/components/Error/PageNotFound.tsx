import React from 'react';
import './Error.css';

const PageNotFound: React.FC = () => {
  return (
    <>
      <div className="error-page">
        <i class='bx bx-error-circle'></i>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or is incorrect.</p>
      </div>
    </>
  );
};

export default PageNotFound;
