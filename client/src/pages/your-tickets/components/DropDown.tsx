import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space } from 'antd';

const DropDown = (): JSX.Element => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: 'DRAFT',
      key: '1',
    },
    {
      label: 'REVIEW REQUESTED',
      key: '2',
    },
    {
      label: 'REVIEW',
      key: '3',
    },
    {
      label: 'CHANGES REQUESTED',
      key: '4',
    },
    {
      label: 'RAISED',
      key: '5',
    },
    {
      label: 'RESOLVED',
      key: '6',
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
          DRAFT
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDown;
