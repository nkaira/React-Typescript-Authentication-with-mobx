import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRoute {
  isAuth: boolean,
  redirectPath?: string,
  children?: JSX.Element,
}

const ProtectedRoute: FC<IProtectedRoute> = ({
  isAuth,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;