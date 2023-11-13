import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@src/hooks/useAuth';
import { Layout, Flex, Image, Typography, Button, Menu } from 'antd';
import LogoWhite from '@src/assets/logo-white.svg';
import { BellOutlined, UserOutlined, ProfileOutlined, EditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import TabsEnum from '@src/types/enums/tabs-enum';
import useSidebarTab from '@src/hooks/useSidebarTab';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } satisfies MenuItem;
}

// TODO (Bryan): Clean up by having function generate tabs
const items: MenuItem[] = [
  getItem('Tickets', 'Tickets Tab', <EditOutlined />, [
    getItem(TabsEnum.ALL_TICKETS, TabsEnum.ALL_TICKETS),
    getItem(TabsEnum.YOUR_TICKETS, TabsEnum.YOUR_TICKETS),
  ]),
  getItem(TabsEnum.MANAGE_USERS, TabsEnum.MANAGE_USERS, <ProfileOutlined />),
];

interface AuthRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: AuthRouteProps): JSX.Element => {
  const isApiCalled = useRef(false);
  const { loadingAuth, isAuthenticated, refreshAccessToken, email, roles } = useAuth();
  const { currentTab, setCurrentTab } = useSidebarTab();

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
              <div className="flex gap-4 items-center">
                <Image width={30} src={LogoWhite} alt="Wordmark Logo of Paper Trail" />
                <Title
                  style={{
                    color: 'white',
                  }}
                >
                  Paper Trail
                </Title>
              </div>
              <div className="flex gap-1">
                <Button type="link" size="middle">
                  <BellOutlined />
                </Button>
                <Button type="link" size="middle">
                  <UserOutlined />
                </Button>
                <Button type="primary" size="middle" className="text-white">
                  Log Out
                </Button>
              </div>
            </Flex>
          </Header>
          <Layout hasSider>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={[currentTab]}
                defaultOpenKeys={['Tickets Tab']}
                style={{ height: '100%' }}
                items={items}
                onSelect={(info) => {
                  const newTab = info.key as TabsEnum;
                  setCurrentTab(newTab);
                }}
              />
            </Sider>
            <Content>{element}</Content>
          </Layout>
        </Layout>
      );
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
