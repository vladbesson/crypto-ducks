import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import NavBar from './NavBar.js';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogin = (username, password) => {
    return duckAuth.authorize(username, password)
      .then((data) => {
        if (!data.jwt) throw new Error('Missing jwt');

        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setUserData({
          username: data.user.username,
          email: data.user.email
        })
        history.push('/ducks');
      });
  };

  const handleRegister = (username, password, email) => {
    return duckAuth.register(username, password, email).then(() => {
      history.push('/login');
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    duckAuth.getContent(jwt).then((data) => {
      setLoggedIn(true);
      setUserData({
        username: data.username,
        email: data.email
      })
      history.push("/ducks");
    });
};

  return (
    <Switch>
      <ProtectedRoute path="/ducks" loggedIn={loggedIn}>
        <NavBar onLogout={handleLogout} />
        <Ducks />
      </ProtectedRoute>
      <ProtectedRoute path="/my-profile" loggedIn={loggedIn}>
        <NavBar onLogout={handleLogout} />
        <MyProfile userData={userData} />
      </ProtectedRoute>
      <Route path="/login">
        <div className="loginContainer">
          <Login onLogin={handleLogin} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register onRegister={handleRegister} />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  )
}

export default App;
