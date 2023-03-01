import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './login-page.css';
import { Form } from 'antd';
import UserInputIcon from '../../static/svg/UserInputIcon.svg';
import ProfileInputLogo from '../../static/svg/ProfileInputLogo.svg';
import { ROUTES } from '../../pages/routes';
import { useUserContext } from '../../contexts/UserContext';
import Button from '../button/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUsername, setUserAvatar } = useUserContext();
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const [form] = Form.useForm();

  const nameValue = Form.useWatch('username', form);
  const urlValue = Form.useWatch('avatar-url', form);

  const submitInfo = (event) => {
    event.preventDefault();
    setUsername(nameValue.charAt(0).toUpperCase() + nameValue.slice(1));
    if (urlValue?.length) {
      setUserAvatar(urlValue);
    }
    navigate(ROUTES.roleSelection, { replace: true });
  }

  useEffect(() => {
    if (nameValue?.length > 0) {
      setBtnIsDisabled(false);
      return;
    }
    setBtnIsDisabled(true);
  }, [nameValue])
  

  return (
    <Form
      form={form}
      layout="vertical"
      className='login-form border-r-4 align-c margin-auto'
      onFinish={submitInfo}
    >
      <div className="form-text">
        <h2 className='margin-b-0'>Welcome! Let&rsquo;s begin.</h2>
        <p>Firstly, enter your name:</p>
      </div>

      <Form.Item 
        label="Name" 
        htmlFor='username-input'
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <div className="user-input-container border-r-4 margin-t-s">
          <img src={UserInputIcon} className='login-input-logo padding-s' alt="userInputIcon" />
          <input
            type="text"
            id="username-input"
            className='login-input user-input-font'
            /* eslint-disable-next-line jsx-a11y/no-autofocus */
            autoFocus
            placeholder="Enter your name here"
          />
        </div>
      </Form.Item>
        
      <Form.Item 
        label="Image link" 
        name="avatar-url"
        htmlFor='profile-pic-input'
      >
        <div className='user-input-container border-r-4 margin-t-s'>
          <img src={ProfileInputLogo} className='login-input-logo padding-s' alt="userInputIcon" />
          <input
            type="url"
            id="profile-pic-input"
            className='login-input user-input-font'
            placeholder="Enter a link of the image"
            autoComplete="off"
          />
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          data-testid="login-btn"
          className="enter-game-btn login-input user-input-font margin-b-0"
          isDisabled={btnIsDisabled}
          clickHandler={submitInfo}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;
