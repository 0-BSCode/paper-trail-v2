import { Typography, Select, Button } from 'antd';
import React from 'react';

const onChange = (value: string): void => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string): void => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }): boolean =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const DocumentAssignee = (): JSX.Element => {
  return (
    <div className="flex flex-col border-r-4 gap-y-3 bg-white shadow-md p-3">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Assignee
      </Typography.Title>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
      <Button>Save Assignee</Button>
    </div>
  );
};

export default DocumentAssignee;
