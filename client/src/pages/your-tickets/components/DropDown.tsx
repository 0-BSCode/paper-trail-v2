import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { type Dispatch, type SetStateAction } from 'react';

interface DropDownProps {
  dropDownFilter: string;
  setDropDownFilter: Dispatch<SetStateAction<string>>;
}

const DropDown = ({ dropDownFilter, setDropDownFilter }: DropDownProps): JSX.Element => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setDropDownFilter(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: 'ALL',
      key: 'ALL',
    },
    {
      label: 'DRAFT',
      key: 'DRAFT',
    },
    {
      label: 'REVIEW REQUESTED',
      key: 'REVIEW_REQUESTED',
    },
    {
      label: 'REVIEW',
      key: 'REVIEW',
    },
    {
      label: 'CHANGES REQUESTED',
      key: 'CHANGES_REQUESTED',
    },
    {
      label: 'RAISED',
      key: 'RAISED',
    },
    {
      label: 'RESOLVED',
      key: 'RESOLVED',
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
          {!dropDownFilter ? 'Status' : dropDownFilter}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDown;
