import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

const Login = ({ login }) => {
  let usernameInput, passwordInput;

  const handleLogin = () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'test' && password === 'password') {
      login({ username, password });
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div>
      <h1>Todo List - Sign in</h1>
      <h3>User - test & password</h3>
      <input ref={node => (usernameInput = node)} placeholder="Username" />
      <input ref={node => (passwordInput = node)} placeholder="Password" type="password" />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

// Map dispatch to props
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

// Connect component to Redux store
export default connect(null, mapDispatchToProps)(Login);
