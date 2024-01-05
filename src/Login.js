import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

const Login = ({ login }) => {
  let usernameInput, passwordInput;

  const handleLogin = async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const r = await fetch("http://localhost:3000/auth/login", {
      method: "POST", body: JSON.stringify({
        username, password
      }), headers: {"content-type": "application/json"}
    });
    if (r.status === 200) {
      const data = await r.json();
      console.log(data);
      login(data);
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <>
      <title>Todo List</title>
      <h1>Todo List - Sign in</h1>
      <h3>User - test & test</h3>
      <input ref={node => (usernameInput = node)} placeholder="Username" />
      <input ref={node => (passwordInput = node)} placeholder="Password" type="password" />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

// Map dispatch to props
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

// Connect component to Redux store
export default connect(null, mapDispatchToProps)(Login);
