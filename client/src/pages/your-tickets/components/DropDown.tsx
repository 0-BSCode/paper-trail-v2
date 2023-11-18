import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const DropDown = (): JSX.Element => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
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
          DRAFT
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropDown;
