import type { ChangeEventHandler } from 'react';
import { Form, Flex, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  label: string;
  value: string | number;
  onChange: ChangeEventHandler;
}

function FormInputField({ name, label, value, onChange }: Props): JSX.Element {
  return (
    <Form.Item name={name} label={label} style={{ marginBottom: '16px' }}>
      <Flex gap="small">
        <Input value={value} onChange={onChange} />
        <EditOutlined />
      </Flex>
    </Form.Item>
  );
}

export default FormInputField;
