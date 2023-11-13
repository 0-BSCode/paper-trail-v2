import TabsEnum from '@src/types/enums/tabs-enum';
import { Layout, Menu, type MenuProps } from 'antd';
import { ProfileOutlined, EditOutlined } from '@ant-design/icons';
import YourTicketsPage from '../your-tickets';
import AllTicketsPage from '../all-tickets';
import UserManagementPage from '../user-management';
import { useQueryState } from 'use-location-state';

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

// TODO (Bryan): Clean up by having function generate tabs (take into account user role)
const items: MenuItem[] = [
  getItem('Tickets', 'Tickets Tab', <EditOutlined />, [
    getItem(TabsEnum.ALL_TICKETS, TabsEnum.ALL_TICKETS),
    getItem(TabsEnum.YOUR_TICKETS, TabsEnum.YOUR_TICKETS),
  ]),
  getItem(TabsEnum.MANAGE_USERS, TabsEnum.MANAGE_USERS, <ProfileOutlined />),
];

const HomePage = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useQueryState('currentTab', TabsEnum.YOUR_TICKETS);
  return (
    <Layout hasSider className="h-full">
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          defaultOpenKeys={['Tickets Tab']}
          className="h-full"
          items={items}
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
