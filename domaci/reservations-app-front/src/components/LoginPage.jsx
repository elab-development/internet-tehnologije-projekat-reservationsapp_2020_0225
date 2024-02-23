import React, { useState } from 'react';
import '../CSS/LoginPage.css';

const LoginPage = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const users = [
    { username: 'Dimitrije', password: 'dimitrije123' },
    { username: 'Kristina', password: 'kristina123' }
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username);
    } else {
      alert('Bad credentials, try again!.');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>LOGIN FORM:</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default LoginPage;