import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AuthRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: AuthRouteProps): JSX.Element => {
  const isApiCalled = useRef(false);
  const { loadingAuth, isAuthenticated, refreshAccessToken } = useAuth();

  useEffect(() => {
    if (!isApiCalled.current) {
      refreshAccessToken();
      isApiCalled.current = true;
    }
  }, []);

  if (loadingAuth) {
    return <></>;
  } else {
    if (isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
