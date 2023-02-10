import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './login-page.css';
import UserInputIcon from '../../static/svg/UserInputIcon.svg';
import ProfileInputLogo from '../../static/svg/ProfileInputLogo.svg';
import { ROUTES } from '../../pages/routes';
import { useUserContext } from '../../contexts/UserContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const userContext = useUserContext();

  const submitInfo = (event) => {
    event.preventDefault();
    userContext.setUsername(event.target.username.value);
    navigate(ROUTES.roleSelection, { replace: true });
  }

  const checkInputLength = (event) => {
    if(event.target.value.length) {
      setBtnIsDisabled(false)
      return;
    }
    setBtnIsDisabled(true);
  }

  return (
    <form className="login-form border-r-4 align-c margin-auto f-column-between" onSubmit={submitInfo}>
      <div className="form-text">
        <h2>Welcome! Let&rsquo;s begin.</h2>
        <p>Firstly, enter your name:</p>
      </div>

      <div className='form-input-container'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='username-input'>Name</label>
        <div className="user-input-container border-r-4 margin-t-s">
          <img src={UserInputIcon} className='login-input-logo padding-s' alt="userInputIcon" />
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

      <div className='form-input-container'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='profile-pic-input'>Profile url (Optional)</label>
        <div className='user-input-container border-r-4 margin-t-s'>
          <img src={ProfileInputLogo} className='login-input-logo padding-s' alt="userInputIcon" />
          <input
            type="url"
            name="username"
            id="profile-pic-input"
            className='login-input user-input-font'
            placeholder="Enter profile picture link"
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        data-testid="login-btn"
        className="enter-game-btn border-r-4 login-input user-input-font"
        disabled={btnIsDisabled}
      >
        Enter Game
      </button>
    </form>
  )
}

export default LoginForm