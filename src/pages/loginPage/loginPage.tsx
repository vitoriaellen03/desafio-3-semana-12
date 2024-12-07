import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Login from './components/login';
import Register from './components/register';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleTabSwitch = (tab) => {
    setIsLogin(tab === 'login');
  };

  return (
    <div className={styles.cLoginPage}>
      <div className={styles.tblogin}>
      <div className={styles.tabs}>
        <button
          className={isLogin ? styles.activeTab : styles.desactiveTab}
          onClick={() => handleTabSwitch('login')}
        >
          Login
        </button>
        <button
          className={!isLogin ? styles.activeTab : styles.desactiveTab}
          onClick={() => handleTabSwitch('register')}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <div className={styles.aclogin}>
          <h2>Login</h2>
          <Login />
          <span className={styles.orText}>or</span>
          <SignedOut>
            <SignInButton>Log in with Clerk</SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      ) : (
        <div className={styles.acregister}>
          <h2>Register</h2>
          <Register />
        </div>
      )}
      </div>
    </div>
  );
};

export default LoginPage;
