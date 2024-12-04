import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleRegisterLocal = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users');
      const existingUser = response.data.find((user) => user.email === registerEmail);

      if (existingUser) {
        setRegisterError('Email is already registered!');
        return;
      }

      const newUser = {
        email: registerEmail,
        password: registerPassword,
      };

      const registerResponse = await axios.post('http://localhost:5000/users', newUser);

      if (registerResponse.status === 201) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/shop';
      }
    } catch (error) {
      setRegisterError('Error while registering user!');
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleRegisterLocal}>
      <div>
        <label htmlFor="registerEmail">Email:</label>
        <input
          type="email"
          id="registerEmail"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
    </form>
  );
};

export default Register;
