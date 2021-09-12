import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { useHistory } from 'react-router-dom';
import './signup.css';

function SignUp() {
  const authSettings = useContext(AuthContext);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    authSettings.signup(username, password, email, role);
    const path = `/`;
    history.push(path);
  };

  return (
    <>
      <div id="login-box">
        <div className="sign-left">
          <h1 className = 'sign-h1'>Sign up</h1>
          <form onSubmit={handleSignup}>
            <input
              className = 'sign-input'
              type="text"
              name="firstName"
              placeholder="Username"
              onChange={handleUsername}
            />
            <input
              className = 'sign-input'
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={handleEmail}
            />
            <input
              className = 'sign-input'
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePassword}
            />

            <select onChange={handleRole} className="login-input" name="" id="">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input type="submit" name="signup_submit" value="Sign up" className = 'sign-input' />
          </form>
        </div>

        <div className="sign-right">
          <span className="loginwith">
            Sign in with
            <br />
            social network
          </span>

          <button className="social-signin facebook">Log in with facebook</button>
          <button className="social-signin twitter">Log in with Twitter</button>
          <button className="social-signin google">Log in with Google+</button>
        </div>
        <div className="or">OR</div>
      </div>
    </>
  );
}

export default SignUp;
