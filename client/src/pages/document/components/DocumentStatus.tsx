import StatusEnum from '@src/types/enums/status-enum';
import { Button, Form, Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinish = (values: any): void => {
  console.log('Received values of form: ', values);
};

const getSelectOptionLabel = (status: StatusEnum): string => {
  let res = '';
  const statusSplit = status.split('_');

  for (const s of statusSplit) {
    res = s.charAt(0).toUpperCase() + s.slice(1);
  }

  return res;
};

const optionToStatusMapping = {
  'Changes Requested': StatusEnum.CHANGES_REQUESTED,
  Draft: StatusEnum.DRAFT,
  Raised: StatusEnum.RAISED,
  Resolved: StatusEnum.RESOLVED,
  Review: StatusEnum.REVIEW,
  'Review Requested': StatusEnum.REVIEW_REQUESTED,
};

const DocumentStatus = (): JSX.Element => {
  const [currentStatus, setCurrentStatus] = useState('Draft');

  return (
    <Form name="complex-form" onFinish={onFinish} className="w-full h-9 flex">
      <Form.Item>
        <Space>
          <Form.Item name={['status']} rules={[{ required: true, message: 'Status is required' }]}>
            <Select
              placeholder="Select status"
              allowClear={false}
              style={{
                width: '11rem',
              }}
              value={currentStatus}
              onSelect={setCurrentStatus}
            >
              {Object.keys(optionToStatusMapping).map((status, idx) => (
                <Option key={`status_${idx}`} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DocumentStatus;
