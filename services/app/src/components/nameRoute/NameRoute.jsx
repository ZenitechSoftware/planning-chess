import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import Modal from './Modal';

const NameRoute = () => {
  if (
    window.localStorage.getItem('user') === null ||
    window.localStorage.getItem('user') === 'null'
  ) {
    return <Modal />;
  } else {
    return <Outlet />;
  }
};

export default NameRoute;
