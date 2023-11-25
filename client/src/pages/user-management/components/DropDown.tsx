import { DownOutlined } from '@ant-design/icons';
import RoleEnum from '@src/types/enums/role-enum';
import convertToTitleCase from '@src/utils/convertToTitleCase';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { type Dispatch, type SetStateAction } from 'react';

interface DropDownProps {
  dropDownFilter: string;
  setDropDownFilter: Dispatch<SetStateAction<RoleEnum>>;
}

const DropDown = ({ dropDownFilter, setDropDownFilter }: DropDownProps): JSX.Element => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setDropDownFilter(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: 'All',
      key: RoleEnum.ALL,
    },
    {
      label: 'Student',
      key: RoleEnum.STUDENT,
    },
    {
      label: 'CISCO Admin',
      key: RoleEnum.CISCO_ADMIN,
    },
    {
      label: 'CISCO Member',
      key: RoleEnum.CISCO_MEMBER,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {convertToTitleCase(dropDownFilter)}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDown;
