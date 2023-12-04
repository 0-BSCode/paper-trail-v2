import useUsers from '@src/hooks/useUsers';
import RoleEnum from '@src/types/enums/role-enum';
import { Select } from 'antd';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface DropDownProps {
  setAssigneeFilter: Dispatch<SetStateAction<string>>;
}

const AssigneeDropDown = ({ setAssigneeFilter }: DropDownProps): JSX.Element => {
  const { allUsers } = useUsers();
  const [searchText, setSearchText] = useState('');
  const ciscoOfficers = allUsers
    .filter((u) => u.roles.some((r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN))
    .map((u) => ({
      value: u.email,
      label: u.email,
    }));

  const onSearch = (searchVal: string): void => {
    setSearchText(searchVal);
  };

  const onChange = (assignee: string): void => {
    setAssigneeFilter(assignee);
    setSearchText('');
  };

  return (
    <Select
      open={searchText.length >= 3}
      showSearch
      allowClear
      placeholder="Assignee"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      onChange={onChange}
      onSearch={onSearch}
      options={ciscoOfficers}
      style={{ width: '100%' }}
    />
  );
};

export default AssigneeDropDown;
