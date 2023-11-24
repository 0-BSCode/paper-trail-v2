import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type UserInterface from '@src/types/interfaces/user';

interface UsersTableProps {
  users: UserInterface[];
}

const data: UserInterface[] = [
  {
    roles: { id: 1, name: 'Admin' },
    email: 'John Brown',
  },
  {
    roles: { id: 1, name: 'Admin' },
    email: 'Jim Green',
  },
  {
    roles: { id: 1, name: 'Admin' },
    email: 'Joe Black',
  },
];

const UsersTable = ({ users }: UsersTableProps): JSX.Element => {
  const columns: ColumnsType<UserInterface> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record) => <p>{record.email}</p>,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, record) => <p>Role</p>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
        total: 22,
      }}
      rowKey="id"
    />
  );
};

export default UsersTable;
