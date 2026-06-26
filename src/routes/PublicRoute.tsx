import { Navigate, Outlet } from 'react-router-dom';

import { getCurrentUser } from '../utils/auth';

export const PublicRoute = () => {
  const currentUser = getCurrentUser();

  return currentUser ? <Navigate to="/products" replace /> : <Outlet />;
};
