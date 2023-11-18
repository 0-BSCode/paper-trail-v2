import DropDown from './DropDown';
import TicketsTable from './TicketsTable';
import { Input } from 'antd';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';

const YourTickets = (): JSX.Element => {
  const { userId } = useAuth();
  const { allTickets } = useDocuments();
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
            tic.userId === userId,
        ),
      );
    } else {
      setFiltered(false);
      setFilteredTickets(allTickets.filter((doc) => doc.assigneeId === userId));
    }
  }, [titleFilter, dropDownFilter]);

  return (
    <div className="w-[90%] h-full bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Your Tickets</h1>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex my-2  flex-col justify-start w-[40%]">
            <p className="font-semibold">Search by Title</p>
            <Input
              onChange={(e) => {
                setTitleFilter(e.target.value);
                console.log(titleFilter);
              }}
              placeholder="Title"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex flex-col my-2 mb-3">
            <p className="font-semibold">Status</p>
            <DropDown dropDownFilter={dropDownFilter} setDropDownFilter={setDropDownFilter} />
          </div>
        </div>
      </div>
      <TicketsTable documents={filtered ? filteredTickets : allTickets.filter((doc) => doc.userId === userId)} />
    </div>
  );
};

export default YourTickets;
