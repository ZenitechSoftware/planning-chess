import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function WindowPrompt() {
  return (
    <div className="windowPrompt">
      <button onClick={prompt()}>Press Me</button>
    </div>
  );
}

function prompt() {
  let person = prompt('Please enter your name');
  if (person != null) {
    window.localStorage.setItem('playerName', person);
  }
}

const NameRoute = () => {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFormLocalStorage = localStorage.getItem('user');
    if (userFormLocalStorage) {
      const foundUser = JSON.parse(userFormLocalStorage);
      setUser(foundUser);
    }
  }, [user]);

  if (user !== null) {
    setAuth(true);
  }

  return auth ? <Outlet /> : <WindowPrompt />;
};

export default NameRoute;
