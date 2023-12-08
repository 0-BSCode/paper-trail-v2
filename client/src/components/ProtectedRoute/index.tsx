import { useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import { Layout, Flex, Button } from 'antd';
import { ToastContext } from '@src/context/ToastContext';
import { NotificationModal } from './Notifications';
import { UserProfileModal } from './UserProfile';
import WordmarkLogo from '../WordmarkLogo';
import { LogoutOutlined } from '@ant-design/icons';
import Spinner from '../Spinner';
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
    return <Spinner size="lg" />;
  } else {
    if (isAuthenticated)
      return (
        <Layout className="h-screen">
          <Header className="h-fit">
            <Flex className="sticky top-0 items-center justify-between">
              <WordmarkLogo />
              <div className="flex items-center gap-1">
                <NotificationModal />
                <UserProfileModal />
                <Button
                  danger
                  title="Log Out"
                  type="link"
                  size="large"
                  onClick={() => {
                    void logoutUser();
                  }}
                >
                  <LogoutOutlined />
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
