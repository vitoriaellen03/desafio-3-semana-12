import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users');
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Salvar status de login no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login bem-sucedido!');
        // Redirecionar para a página inicial ou outra página
        window.location.href = '/cart/checkout';  // Ou use React Router: `navigate('/home')`
      } else {
        setError('Email ou senha incorretos!');
      }
    } catch (error) {
      setError('Erro ao verificar o login!');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
