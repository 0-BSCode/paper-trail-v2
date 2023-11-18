import { Input } from 'antd';
import TicketsTable from './TicketsTable';
import DropDown from './DropDown';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';

const SharedTickets = (): JSX.Element => {
  const { allTickets } = useDocuments();
  const { userId } = useAuth();
  const [filtered, setFiltered] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dropDownFilter, setDropDownFilter] = useState<string>('ALL');
  const [filteredTickets, setFilteredTickets] = useState<TicketInterface[]>(allTickets);

  useEffect(() => {
    if (titleFilter?.length > 3 || dropDownFilter !== 'ALL') {
      setFiltered(true);

      setFilteredTickets(
        allTickets.filter(
          (tic) =>
            (titleFilter?.length > 3 ? tic.title.toLowerCase().includes(titleFilter) : true) &&
            (dropDownFilter === 'ALL' ? true : tic.status === dropDownFilter) &&
            tic.users.some((t) => t.userId === userId),
        ),
      );
    } else {
      setFiltered(false);
      setFilteredTickets(allTickets.filter((doc) => doc.assigneeId === userId));
    }
  }, [titleFilter, dropDownFilter]);

  return (
    <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Shared Tickets</h1>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-[40%]">
            <p className="my-2 font-semibold">Search by Title</p>
            <Input
              onChange={(e) => {
                setTitleFilter(e.target.value);
              }}
              placeholder="Title"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Status</p>
            <DropDown dropDownFilter={dropDownFilter} setDropDownFilter={setDropDownFilter} />
          </div>
        </div>
      </div>
      <TicketsTable
        documents={
          filtered ? filteredTickets : allTickets.filter((doc) => doc.users.some((tic) => tic.userId === userId))
        }
      />
    </div>
  );
};

export default SharedTickets;
