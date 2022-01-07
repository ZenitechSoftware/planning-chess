import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';

const NameRoute = () => {
  const { authentication } = useUserFromLocalStorage();
  return authentication && <Outlet /> ;
};

export default NameRoute;
