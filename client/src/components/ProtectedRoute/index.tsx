import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AuthRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: AuthRouteProps): JSX.Element => {
  const { loadingAuth, isAuthenticated, refreshAccessToken } = useAuth();

  useEffect(() => {
    refreshAccessToken();
  }, []);

  if (loadingAuth) {
    return <></>;
  } else {
    if (isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
