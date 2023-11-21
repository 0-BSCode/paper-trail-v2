import { useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import { Layout, Flex, Image, Typography, Button } from 'antd';
import LogoWhite from '@src/assets/logo-white.svg';
import { UserOutlined } from '@ant-design/icons';
import { ToastContext } from '@src/context/ToastContext';
import { NotificationModal } from './Notifications';

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
            <Flex className="items-center justify-between">
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
              <div className="flex gap-1">
                <NotificationModal />
                <Button type="link" size="middle">
                  <UserOutlined />
                </Button>
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
