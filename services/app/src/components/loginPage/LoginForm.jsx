import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './loginPage.css'
import '../../static/style/fonts.css'
import userInputIcon from './SVGs/userInputIcon.svg';
import * as paths from '../../constants/urls'
import { useGameId } from '../../hooks/useGameId';
import { get } from '../../http';

const LoginForm = () => {
  const navigate = useNavigate();
  const { gameId } = useGameId();
  const [error, setError] = useState(null);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const submitInfo = async (event) => {
    event.preventDefault();
    setError(false);

    const players = (await get(`api/game/${gameId}/players`))?.data?.players || [];
    const playerNames = players.map(({ name }) => name);
    const username = event.target.username.value;

    if (playerNames.includes(username)) {
      setError('Username is already taken.');
      return;
    }

    window.localStorage.setItem('user', event.target.username.value);
    navigate(paths.gameRoomUrl(gameId));
  }

  const checkInputLength = (event) => {
    setError(false);
    if(event.target.value.length) {
      setBtnIsDisabled(false)
      return;
    }
    setBtnIsDisabled(true);
  }

  return (
    <form className="login-form" onSubmit={submitInfo}>
      <div className="form-text">
        <h2>Welcome! Let&rsquo;s begin.</h2>
        <p>Firstly, enter your name:</p>
      </div>

      <div className='form-input-container'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='username-input'>Name</label>
        <div className="user-input-container">
          <img src={userInputIcon} alt="userInputIcon" />
          <input
            type="text"
            name="username"
            id="username-input"
            className='login-input user-input-font'
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
            placeholder="Enter your name here"
            onChange={checkInputLength}
          />
        </div>
        <div className="error-container">
          {error && <span className="error-label">{error}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="enter-game-btn login-input user-input-font"
        disabled={btnIsDisabled}
      >
        Enter Game
      </button>
    </form>
  )
}

export default LoginForm;
