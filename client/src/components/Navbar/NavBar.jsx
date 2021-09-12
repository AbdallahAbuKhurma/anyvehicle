import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { If, Then, Else } from 'react-if';
import './navbar.css';

import logo from '../../assets/logo.png';

function Navbar() {
  const authSettings = useContext(AuthContext);
  console.log(authSettings);

  return (
    <div id='con' className='navbar-body'>
      <nav
        className={ 'nav1 active-nav'}
      >
        <div className="nav-container1">
          <p>We Keep Your Engine Running</p>
          <ul className='navbar-ul'>
            <li>346 Woodbridge Lane, Seattle</li>
            <li>info@autolane.com</li>
            <li>Career</li>
            <li>Appointments</li>
          </ul>
        </div>
      </nav>
      {/* second */}
      <nav
        className={ 'nav2 active-nav'}
      >
        <div className="nav-container2">
          <img className="nav-logo" src={logo} alt='pic' />
          <If condition = {!authSettings.loggedIn}>
            <Then>
              <ul className='navbar-ul'>
                <li><a href="/" className="nav-current">Home</a></li>
                {/* <li><a href="/admin">Admin</a></li> */}
                <li><a href="/signin">Login</a></li>
                <li><a href="/about">About US</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a className = 'call-us' href="/call">Call us Now</a></li>
              </ul>
            </Then>
            <Else>
              <If condition = {authSettings.loggedIn && authSettings.capabilities.includes('delete')}>
                <Then>
                  <ul className='navbar-ul'>
                    <li><a href="/" className="nav-current">Home</a></li>
                    <li><a href="/admin">Admin</a></li>
                    <li><a onClick = {authSettings.logout} href="/signin">Logout</a></li>
                    <li><a href="/about">About US</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a className = 'call-us' href="/call">Call us Now</a></li>
                  </ul>
                </Then>
                <Else>
                  <ul className='navbar-ul'>
                    <li><a href="/" className="nav-current">Home</a></li>
                    {/* <li><a href="/admin">Admin</a></li> */}
                    <li><a onClick = {authSettings.logout} href="/signin">Logout</a></li>
                    <li><a href="/about">About US</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a className = 'call-us' href="/call">Call us Now</a></li>
                  </ul>
                </Else>
              </If>
            </Else>
          </If>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
