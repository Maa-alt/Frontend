// src/components/Register.js
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { addUser, isRegistered } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      addUser(username, password); // Register the user
      navigate('/'); // Redirect to login page after registration
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleRegister}>Register</button>
      
    </div>
  );
};

export default Register;
