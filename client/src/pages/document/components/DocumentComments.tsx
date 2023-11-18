import React from 'react';
import { Space, Typography } from 'antd';

const DocumentComments = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-3 bg-white shadow-md border-r-4 p-2">
      <Typography.Title
        level={5}
        style={{
          margin: 0,
        }}
      >
        Comments
      </Typography.Title>
      <Space></Space>
    </div>
  );
};

export default DocumentComments;
