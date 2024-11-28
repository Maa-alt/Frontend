import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(true); // To toggle between signup and login modes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savedCredentials, setSavedCredentials] = useState(null); // To store registered user credentials
  const [signupMessage, setSignupMessage] = useState(''); // State for the signup success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Handle signup logic
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
      } else if (!username || !password) {
        setErrorMessage('Please fill in all fields');
      } else {
        // Save credentials after signup
        setSavedCredentials({ username, password });
        setSignupMessage('Signup successful! Please log in.');
        setIsSignup(false); // Switch to login mode
        setErrorMessage('');
        clearForm();
      }
    } else {
      // Handle login logic
      if (
        username === savedCredentials?.username &&
        password === savedCredentials?.password
      ) {
        onLogin(); // Trigger login callback if credentials are correct
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid credentials');
      }
    }
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setSignupMessage('');
    setErrorMessage('');
    clearForm();
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {signupMessage && (
          <div style={{ color: 'green', textAlign: 'right', marginTop: '10px' }}>
            {signupMessage}
          </div>
        )}
        {errorMessage && (
          <div style={{ color: 'red', textAlign: 'right', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={toggleMode}>
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Login;
