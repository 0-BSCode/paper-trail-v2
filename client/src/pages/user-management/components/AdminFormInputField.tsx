import type { ChangeEventHandler } from 'react';
import { Form, Flex, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  label: string;
  value: string | number;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
  type: string;
  placeholder?: string;
  isValid?: boolean;
  isEditable?: boolean;
}

function AdminFormInputField({
  name,
  label,
  value,
  onChange,
  disabled,
  type,
  placeholder,
  isValid,
  isEditable,
}: Props): JSX.Element {
  const status = disabled === true || isValid ? '' : 'error';
  return (
    <Form.Item name={name} label={label} style={{ marginBottom: '16px' }}>
      <Flex gap="small">
        <Input
          disabled={disabled}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          status={status}
        />
        {isEditable === false ? '' : <EditOutlined />}
      </Flex>
    </Form.Item>
  );
}

export default AdminFormInputField;
