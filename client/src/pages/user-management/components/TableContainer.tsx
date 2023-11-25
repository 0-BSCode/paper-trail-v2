import { Input } from 'antd';
import { useState, useEffect } from 'react';
import DropDown from './DropDown';
import UsersTable from './UsersTable';
import useUsers from '@src/hooks/useUsers';
import type UserInterface from '@src/types/interfaces/user';
import RoleEnum from '@src/types/enums/role-enum';

const TableContainer = (): JSX.Element => {
  const { allUsers } = useUsers();

  const [filtered, setFiltered] = useState<boolean>(false);
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [dropDownFilter, setDropDownFilter] = useState<RoleEnum>(RoleEnum.STUDENT);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>(allUsers);

  useEffect(() => {
    if (emailFilter.length > 3 || dropDownFilter !== RoleEnum.STUDENT) {
      setFiltered(true);

      setFilteredUsers(
        allUsers.filter(
          (user) =>
            (emailFilter.length > 3 ? user.email.toLowerCase().includes(emailFilter.toLowerCase()) : true) &&
            (dropDownFilter === RoleEnum.STUDENT ? true : user.roles?.some((role) => role.name === dropDownFilter)),
        ),
      );
    } else {
      setFiltered(false);
      setFilteredUsers(allUsers);
    }
  }, [emailFilter, dropDownFilter]);

  return (
    <div className="w-[70%] h-[45%] bg-white-100 ml-[4%] flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 mb-5 text-xl font-bold border-2 border-black">Users</h1>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex  flex-col justify-start w-[40%]">
            <p className="my-2 font-semibold ">Search by Email</p>
            <Input
              onChange={(e) => {
                setEmailFilter(e.target.value);
              }}
              placeholder="Email"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Role</p>
            <DropDown dropDownFilter={dropDownFilter} setDropDownFilter={setDropDownFilter} />
          </div>
        </div>
      </div>
      <UsersTable users={filtered ? filteredUsers : allUsers} />
    </div>
  );
};

export default TableContainer;
