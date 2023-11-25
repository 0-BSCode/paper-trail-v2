import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type UserInterface from '@src/types/interfaces/user';
import convertToTitleCase from '@src/utils/convertToTitleCase';

interface UsersTableProps {
  users: UserInterface[];
}

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
      render: (_, record) => {
        if (record.roles.length === 0) return <p>No roles</p>;

        return <p>{convertToTitleCase(record.roles[0].name)}</p>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        pageSize: 10,
        total: users.length,
      }}
      rowKey="email"
    />
  );
};

export default UsersTable;
