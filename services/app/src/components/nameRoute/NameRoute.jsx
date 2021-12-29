import React from 'react';
import { Outlet } from 'react-router-dom';
import WindowPrompt from '../prompt/WindowPrompt';
import {useUserFromLocalStorage} from "../../hooks/useUserFromLocalStorage";

const NameRoute = () => {
  const {authentication} = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <WindowPrompt />;
}

export default NameRoute;
