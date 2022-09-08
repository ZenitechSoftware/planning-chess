import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { WsContext } from '../../contexts/ws-context';
import './loginPage.css'
import '../../static/style/fonts.css'
import userInputIcon from './SVGs/userInputIcon.svg';
import { gameRoomUrl } from '../../constants/urls';
import { buildPlayerConnectedEventMessage } from '../../api/playerApi';

const LoginForm = () => {
  const navigate = useNavigate();
  const navigateUrl = gameRoomUrl;
  const { ws } = useContext(WsContext);

  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const submitInfo = (event) => {
    event.preventDefault();
    window.localStorage.setItem('user', event.target.username.value);
    navigate(navigateUrl);
    ws.send(
      JSON.stringify(
        buildPlayerConnectedEventMessage(event.target.username.value)
      ),
    );
  }

  const checkInputLength = (event) => {
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
        {/* eslint-disable-next-line */}
        <label htmlFor='username-input'>Name</label>
        <div className="user-input-container">
          <img src={userInputIcon} alt="userInputIcon" />
          <input 
            type="text" 
            name="username" 
            id="username-input"
            className='login-input user-input-font'
            /* eslint-disable-next-line */
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