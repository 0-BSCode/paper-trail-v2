import TabsEnum from '@src/types/enums/tabs-enum';
import { Layout, Menu, type MenuProps } from 'antd';
import { ProfileOutlined, EditOutlined } from '@ant-design/icons';
import YourTicketsPage from '../your-tickets';
import AllTicketsPage from '../all-tickets';
import UserManagementPage from '../user-management';
import { useQueryState } from 'use-location-state';
import { useContext } from 'react';
import { AuthContext } from '@src/context/AuthContext';
import RoleEnum from '@src/types/enums/role-enum';

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } satisfies MenuItem;
}

// TODO (Bryan): Update tabs if role changed w/o having to log out
const generateMenuItems = (roles: string[]): MenuItem[] => {
  const menuItems: MenuItem[] = [];
  const submenuItems = [getItem(TabsEnum.YOUR_TICKETS, TabsEnum.YOUR_TICKETS)];

  if (roles.some((role) => role === RoleEnum.CISCO_MEMBER || role === RoleEnum.CISCO_ADMIN)) {
    submenuItems.unshift(getItem(TabsEnum.ALL_TICKETS, TabsEnum.ALL_TICKETS));
  }

  menuItems.push(getItem('Tickets', 'Tickets Tab', <EditOutlined />, submenuItems));
  if (roles.some((role) => role === RoleEnum.CISCO_ADMIN)) {
    menuItems.push(getItem(TabsEnum.MANAGE_USERS, TabsEnum.MANAGE_USERS, <ProfileOutlined />));
  }

  return menuItems;
};

const HomePage = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useQueryState('currentTab', TabsEnum.YOUR_TICKETS);
  const { roles } = useContext(AuthContext);

  return (
    <Layout hasSider className="h-full">
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          defaultOpenKeys={['Tickets Tab']}
          className="h-full"
          items={generateMenuItems(roles ?? [])}
          onSelect={(info) => {
            const newTab = info.key as TabsEnum;
            setCurrentTab(newTab);
          }}
        />
      </Sider>
      <Content>
        {currentTab === TabsEnum.YOUR_TICKETS && <YourTicketsPage />}
        {currentTab === TabsEnum.ALL_TICKETS && <AllTicketsPage />}
        {currentTab === TabsEnum.MANAGE_USERS && <UserManagementPage />}
      </Content>
    </Layout>
  );
};

export default HomePage;
