import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  title: string;
  owner: string;
  status: string;
  assignee: string;
}

const columns: ColumnsType<DataType> = [
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

const data: DataType[] = [
  {
    id: 1,
    title: 'Test Document 1',
    owner: 'Dummy',
    status: 'Resolved',
    assignee: 'Sam',
  },
  {
    id: 2,
    title: 'Test Document 2',
    owner: 'Dummy',
    status: 'Draft',
    assignee: 'Sam',
  },
];

const TicketsTable: React.FC = () => <Table columns={columns} dataSource={data} />;

export default TicketsTable;
