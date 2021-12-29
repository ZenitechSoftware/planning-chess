import React from 'react';
import { Outlet } from 'react-router-dom';
import WindowPrompt from '../prompt/WindowPrompt';
import {useUserFromLocalStorage} from "../../hooks/useUserFromLocalStorage";

const NameRoute = () => {
  const auth = useUserFromLocalStorage();
  return auth ? <Outlet /> : <WindowPrompt />;
}

export default NameRoute;
