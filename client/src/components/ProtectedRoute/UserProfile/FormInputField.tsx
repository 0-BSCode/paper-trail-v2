import type { ChangeEventHandler } from 'react';
import { Form, Flex, Input } from 'antd';

interface Props {
  name: string;
  label: string;
  value: string | number;
  onChange: ChangeEventHandler;
  disabled?: boolean;
  type: string;
  placeholder?: string;
  isValid?: boolean;
}

function FormInputField({ name, label, value, onChange, disabled, type, placeholder, isValid }: Props): JSX.Element {
  const status = disabled ?? isValid ? '' : 'error';
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
      </Flex>
    </Form.Item>
  );
}

export default FormInputField;
