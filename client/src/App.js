import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import SignIn from './components/Signin/Signin';
import SignUp from './components/Signup/Signup';
import Services from './components/Services/Services';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthContext>
            <NavBar/>
            <Route exact path = '/'>
              <Home/>
            </Route>
            <Route exact path = '/services'>
              <Services/>
            </Route>
            <Route exact path = '/admin'>
              <Admin/>
            </Route>
            <Route exact path = '/signin'>
              <SignIn/>
            </Route>
            <Route exact path = '/signup'>
              <SignUp/>
            </Route>
          </AuthContext>
        </Switch>
      </Router>
    </>
  );
}

export default App;
