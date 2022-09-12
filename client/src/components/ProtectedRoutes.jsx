import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../utils/contextHook';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Spinner display={true} />;
  }
  return user ? children : <Navigate to="/"></Navigate>;
};
export default PrivateRoute;
