import { useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import { Layout, Flex, Button } from 'antd';
import { ToastContext } from '@src/context/ToastContext';
import { NotificationModal } from './Notifications';
import { UserProfileModal } from './UserProfile';
import WordmarkLogo from '../WordmarkLogo';

const { Header, Content } = Layout;

interface AuthRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: AuthRouteProps): JSX.Element => {
  const isApiCalled = useRef(false);
  const { success } = useContext(ToastContext);
  const { loadingAuth, isAuthenticated, refreshAccessToken, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async (): Promise<void> => {
    await logout();
    success('Successfully logged out!');
    navigate('/login');
  };

  useEffect(() => {
    if (!isApiCalled.current) {
      void refreshAccessToken();
      isApiCalled.current = true;
    }
  }, []);

  if (loadingAuth) {
    return <></>;
  } else {
    if (isAuthenticated)
      return (
        <Layout className="h-screen">
          <Header className="h-fit">
            <Flex className="items-center justify-between">
              <WordmarkLogo />
              <div className="flex gap-1">
                <NotificationModal />
                <UserProfileModal />
                <Button
                  type="primary"
                  size="middle"
                  className="text-white"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={logoutUser}
                >
                  Log Out
                </Button>
              </div>
            </Flex>
          </Header>
          <Content>{element}</Content>
        </Layout>
      );
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
