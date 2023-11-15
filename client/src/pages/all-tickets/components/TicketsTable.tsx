import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    id: 1,
    title: 'Test Document 1',
    owner: 'Dummy',
    status: 'Resolved',
    assignee_id: 2,
  },
  {
    id: 2,
    title: 'Test Document 2',
    assignee: 'Sam',
    owner: 'Dummy',
    status: 'Draft',
    assignee_id: 3,
  },
  {
    id: 3,
    title: 'Test Document 3',
    assignee: 'Sam',
    owner: 'Dummy',
    status: 'Review',
    assignee_id: 3,
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
];

const TicketsTable: React.FC = () => <Table columns={columns} dataSource={data} />;

export default TicketsTable;
