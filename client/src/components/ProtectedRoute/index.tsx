import { useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import { Layout, Flex, Image, Typography, Button } from 'antd';
import LogoWhite from '@src/assets/logo-white.svg';
import { ToastContext } from '@src/context/ToastContext';
import { NotificationModal } from './Notifications';
import { UserProfileModal } from './UserProfile';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
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
            <Flex className="sticky top-0 items-center justify-between">
              <div className="flex items-center gap-4">
                <Image width={30} src={LogoWhite} alt="Wordmark Logo of Paper Trail" />
                <Title
                  style={{
                    color: 'white',
                    marginTop: 1,
                    marginBottom: 5,
                  }}
                >
                  Paper Trail
                </Title>
              </div>
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
