import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateGameRoomUUID } from '../../api/gameApi';

const PrivateRoute = () => {
  const [auth, setAuth] = useState([]);

  const passedUUIDpath = window.location.pathname.replace('/game/', '');

  useEffect(() => {
    validateGameRoomUUID(passedUUIDpath).then((r) => {
      setAuth(r.data.test);
    });
  }, [passedUUIDpath]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
