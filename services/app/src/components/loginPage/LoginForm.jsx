import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './loginPage.css'
import '../../static/style/fonts.css'
import '../../static/style/spacing.css'
import '../../static/style/layout.css'
import userInputIcon from './SVGs/userInputIcon.svg';
import * as paths from '../../constants/urls'
import {useGameId} from "../../hooks/useGameId";

const LoginForm = () => {
  const navigate = useNavigate();
  const { gameId } = useGameId();
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const submitInfo = (event) => {
    event.preventDefault();
    window.localStorage.setItem('user', event.target.username.value);
    navigate(paths.gameRoomUrl(gameId));
  }

  const checkInputLength = (event) => {
    if(event.target.value.length) {
      setBtnIsDisabled(false)
      return;
    }
    setBtnIsDisabled(true);
  }

  return (
    <form className="login-form margin-auto f-column-between" onSubmit={submitInfo}>
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

export default LoginForm