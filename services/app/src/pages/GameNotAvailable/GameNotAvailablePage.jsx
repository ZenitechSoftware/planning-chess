import React from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../routes';
import ErrorPage from '../ErrorPage/ErrorPage';
import Button from '../../components/button/Button';

const GameNotAvailablePage = () => {
  const navigate = useNavigate();

  const onBtnClick = () => {
    navigate(ROUTES.home, { replace: true });
  }

  return (
    <ErrorPage 
      errorMsg='Something went wrong'
    >
      <Button 
        text='Attempt to reconnect'
        clickHandler={onBtnClick}
      />
    </ErrorPage>
  )
}

export default GameNotAvailablePage;