import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useDocuments from '@src/hooks/useDocuments';
import type DocumentInterface from '@src/types/interfaces/document';

const columns: ColumnsType<DocumentInterface> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Assignee',
    dataIndex: 'assignee',
    key: 'assignee',
  },
];

const TicketsTable: React.FC = () => {
  const { userDocuments } = useDocuments();

  return (
    <Table
      columns={columns}
      dataSource={userDocuments}
      pagination={{
        pageSize: 2,
        total: 5,
      }}
    />
  );
};

export default TicketsTable;
