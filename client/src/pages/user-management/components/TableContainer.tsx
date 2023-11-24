import { Input } from 'antd';

import { useState } from 'react';
import DropDown from './DropDown';
import StatusEnum from '@src/types/enums/status-enum';
import UsersTable from './UsersTable';

const TableContainer = (): JSX.Element => {
  const [filtered, setFiltered] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dropDownFilter, setDropDownFilter] = useState<StatusEnum>(StatusEnum.ALL);

  return (
    <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 mb-5 text-xl font-bold border-2 border-black">Users</h1>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex  flex-col justify-start w-[40%]">
            <p className="my-2 font-semibold ">Search by Email</p>
            <Input
              onChange={(e) => {
                setTitleFilter(e.target.value);
              }}
              placeholder="Title"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Role</p>
            <DropDown
              style={{ width: '100px' }}
              dropDownFilter={dropDownFilter}
              setDropDownFilter={setDropDownFilter}
            />
          </div>
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default TableContainer;
