import React from 'react';
import { Navigate, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const authentication = localStorage.getItem('user');
  const navigateUrl = '/game/test';

  const submitInfo = (event) => {
    event.preventDefault();
    window.localStorage.setItem('user', event.target.username.value);
    navigate(navigateUrl);
  };

  return authentication ? (
    <Navigate to={navigateUrl} />
  ) : (
    <div>
      <div>Enter your name</div>
      <form onSubmit={(event) => submitInfo(event)}>
        <input type="text" name="username" />
        <button type="submit">Enter Game</button>
      </form>
    </div>
  );
};

export default LoginPage;
