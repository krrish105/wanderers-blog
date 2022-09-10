import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../utils/contextHook';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/"></Navigate>;
};
export default PrivateRoute;
