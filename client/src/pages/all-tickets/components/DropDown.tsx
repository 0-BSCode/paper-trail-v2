import { DownOutlined } from '@ant-design/icons';
import StatusEnum from '@src/types/enums/status-enum';
import convertToTitleCase from '@src/utils/convertToTitleCase';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { type Dispatch, type SetStateAction } from 'react';

interface DropDownProps {
  dropDownFilter: string;
  setDropDownFilter: Dispatch<SetStateAction<StatusEnum>>;
}

const DropDown = ({ dropDownFilter, setDropDownFilter }: DropDownProps): JSX.Element => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setDropDownFilter(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: 'All',
      key: StatusEnum.ALL,
    },
    {
      label: 'Draft',
      key: StatusEnum.DRAFT,
    },
    {
      label: 'Review Requested',
      key: StatusEnum.REVIEW_REQUESTED,
    },
    {
      label: 'Review',
      key: StatusEnum.REVIEW,
    },
    {
      label: 'Changes Requested',
      key: StatusEnum.CHANGES_REQUESTED,
    },
    {
      label: 'Raised',
      key: StatusEnum.RAISED,
    },
    {
      label: 'Resolved',
      key: StatusEnum.RESOLVED,
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
