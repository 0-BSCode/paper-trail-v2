import type { Dispatch, SetStateAction } from 'react';
import { Select, Form } from 'antd';
import RoleEnum from '@src/types/enums/role-enum';
import RoleTag from './RoleTag';
import convertToTitleCase from '@src/utils/convertToTitleCase';

const OPTIONS = Object.values(RoleEnum).filter((r) => r !== RoleEnum.ALL);

interface Props {
  roles: string[];
  setRoles: Dispatch<SetStateAction<string[]>>;
}

const RoleInput = ({ roles, setRoles }: Props): JSX.Element => {
  const filteredOptions = OPTIONS.filter((o) => !roles.includes(o));

  return (
    <Form.Item name={'roles'} label={'Roles'} style={{ marginBottom: '16px' }} initialValue={roles}>
      <Select
        mode="multiple"
        tagRender={RoleTag}
        placeholder="User does not have roles"
        value={roles}
        onChange={setRoles}
        className="w-100"
        options={filteredOptions.map((i) => ({
          value: i,
          label: convertToTitleCase(i),
        }))}
      />
    </Form.Item>
  );
};

export default RoleInput;
