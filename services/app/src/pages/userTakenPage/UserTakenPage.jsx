import React from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

const UserTakenPage = () => (
  <ErrorPage 
    errorMsg="You have another active session"
  />
);

export default UserTakenPage