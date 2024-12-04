import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginLocal = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/shop';
      } else {
        setError('Incorrect email or password!');
      }
    } catch (error) {
      setError('Error while verifying login!');
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleLoginLocal}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
