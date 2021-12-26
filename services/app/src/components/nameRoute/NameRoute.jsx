import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function promptInput() {
  const person = prompt('Please enter your name');
  if (person != null) {
    window.localStorage.setItem('playerName', person);
  }
}

function WindowPrompt() {
  return (
    <div className="windowPrompt">
      <button type="button" onClick={promptInput()}>
        Press Me
      </button>
    </div>
  );
}

const NameRoute = () => {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFormLocalStorage = localStorage.getItem('user');
    if (userFormLocalStorage) {
      const foundUser = JSON.parse(userFormLocalStorage);
      setUser(foundUser);
      setAuth(true);
    }
  }, [user]);

  return auth ? <Outlet /> : <WindowPrompt />;
};

export default NameRoute;
