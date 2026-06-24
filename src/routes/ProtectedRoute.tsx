import { Navigate, Outlet } from 'react-router-dom';

import { getCurrentUser } from '../utils/auth';

export const ProtectedRoute = () => {
  const currentUser = getCurrentUser();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};
