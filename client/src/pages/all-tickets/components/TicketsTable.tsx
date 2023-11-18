import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type DocumentInterface from '@src/types/interfaces/document';

interface TicketsTableProps {
  documents: DocumentInterface[];
}

const columns: ColumnsType<DocumentInterface> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'id',
    render: (text) => <p>{text.split('T')[0]}</p>,
  },
  {
    title: 'Owner',
    dataIndex: 'userId',
    key: 'owner',
  },
  {
    title: 'Assigned To',
    dataIndex: 'assigneeId',
    key: 'assignee',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const TicketsTable = ({ documents }: TicketsTableProps): JSX.Element => {
  return (
    <Table
      columns={columns}
      dataSource={documents}
      pagination={{
        pageSize: 10,
        total: 5,
      }}
    />
  );
};

export default TicketsTable;
