import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import convertToTitleCase from '@src/utils/convertToTitleCase';
import type TicketInterface from '@src/types/interfaces/ticket';
import { Link } from 'react-router-dom';
import getStatusColor from '@src/utils/getStatusColor';
import type StatusEnum from '@src/types/enums/status-enum';

interface TicketsTableProps {
  documents: TicketInterface[];
}

const AssignedTicketsTable = ({ documents }: TicketsTableProps): JSX.Element => {
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
      dataIndex: 'owner',
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
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <div className={`w-[5.5px] h-[5.5px] rounded-full ${getStatusColor(record.status as StatusEnum)}`}></div>
            {convertToTitleCase(record.status)}
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={documents}
      pagination={{
        pageSize: 5,
        total: documents.length,
      }}
      rowKey="id"
    />
  );
};

export default AssignedTicketsTable;
