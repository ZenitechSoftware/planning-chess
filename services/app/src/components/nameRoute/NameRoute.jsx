import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import UserModal from "../modal/UserModal";

const NameRoute = () => {
  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <UserModal />;
};

export default NameRoute;
