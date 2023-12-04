import useUsers from '@src/hooks/useUsers';
import RoleEnum from '@src/types/enums/role-enum';
import { Select } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

interface DropDownProps {
  setAssigneeFilter: Dispatch<SetStateAction<string>>;
}

const AssigneeDropDown = ({ setAssigneeFilter }: DropDownProps): JSX.Element => {
  const { allUsers } = useUsers();

  const onChange = (assignee: string): void => {
    setAssigneeFilter(assignee);
  };

  const ciscoOfficers = allUsers
    .filter((u) => u.roles.some((r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN))
    .map((u) => ({
      value: u.email,
      label: u.email,
    }));

  return (
    <Select
      showSearch
      allowClear
      style={{ width: '100%' }}
      placeholder="Assignee"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      onChange={onChange}
      options={ciscoOfficers}
    />
  );
};

export default AssigneeDropDown;
