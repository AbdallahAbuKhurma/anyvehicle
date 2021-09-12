import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { useHistory } from 'react-router-dom';
import './signin.css';

function SignIn() {
  const authSettings = useContext(AuthContext);
  const history = useHistory();
  console.log(authSettings);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    authSettings.login(email, password);
    const path = `/`;
    history.push(path);
  };

  return (
    <>
      <div id="login-box">
        <div className="left-signin">
          <h1 className = 'sign-h1'>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              className = 'signinput'
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={handleEmail}
            />
            <input
              className = 'signinput'
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePassword}
            />

            <div className = 'donthaveaccount'>
              <span>Don't have an account?{' '}</span>
              <a href = 'signup'>Signup</a>
            </div>
            <input type="submit" name="signup_submit" value="Sign In" className = 'signinput' />
          </form>
        </div>

        <div className="signright">
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

export default SignIn;
