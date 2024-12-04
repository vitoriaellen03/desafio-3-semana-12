import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Login from './components/login';
import Register from './components/register';

const LoginPage = () => {
  return (
    <div className="App">
      <h2>Login</h2>
      <Login />
      <div>
        <SignedOut>
          <SignInButton>
            Log in with the clerk
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <h2>Register</h2>
      <Register />
    </div>
  );
};

export default LoginPage;
