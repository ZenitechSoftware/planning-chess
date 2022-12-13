import React from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

const UserTakenPage = () => (
  <ErrorPage 
    errorMsg="You have another session active"
  />
);

export default UserTakenPage