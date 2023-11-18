import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type TicketInterface from '@src/types/interfaces/ticket';
import { Link } from 'react-router-dom';

interface TicketsTableProps {
  documents: TicketInterface[];
}

const TicketsTable = ({ documents }: TicketsTableProps): JSX.Element => {
  const columns: ColumnsType<TicketInterface> = [
    {
      title: 'Title',
      dataIndex: ['title', 'id'],
      key: 'title',
      render: (_, record) => (
        <Link to={`/document/${record.id}`}>
          <p>{record.title}</p>
        </Link>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'id',
      render: (text) => <p>{text.split('T')[0]}</p>,
    },
    {
      title: 'Owner',
      key: 'owner',
      dataIndex: 'user',
      render: (obj) => {
        if (!obj.email) return <p>Unassigned</p>;

        return <p>{obj.email}</p>;
      },
    },
    {
      title: 'Assigned To',
      key: 'assignee',
      dataIndex: 'assignee',
      render: (obj) => {
        if (!obj) return <p>Unassigned</p>;

        return <p>{obj.email}</p>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={documents}
      pagination={{
        pageSize: 10,
        total: 5,
      }}
      rowKey="id"
    />
  );
};

export default TicketsTable;
