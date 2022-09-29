import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Register.css';

const Register = ({ onRegister }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email, confirmPassword } = state;

    if (password !== confirmPassword) return;

    onRegister(username, password, email)
      .catch(err => {
        console.log(err);
        setState({
          ...state,
          message: 'Что-то пошло не так!'
        })
      });
  }

  return(
    <div className="register">
      <Logo title={'CryptoDucks'}/>
      <p className="register__welcome">
        Пожалуйста, зарегистрируйтесь.
      </p>
      <p className="register__error">
        {state.message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label for="username">
          Логин:
        </label>
        <input id="username" name="username" type="text" value={state.username} onChange={handleChange} />
        <label for="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={state.email} onChange={handleChange} />
        <label for="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" value={state.password} onChange={handleChange} />
        <label for="confirmPassword">
          Подтвердите пароль:
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={state.confirmPassword} onChange={handleChange} />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;