import StatusDropDown from './StatusDropDown';
import UnassignedTicketsTable from './UnassignedTicketsTable';
import useDocuments from '@src/hooks/useDocuments';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';
import StatusEnum from '@src/types/enums/status-enum';

const UnassignedTickets = (): JSX.Element => {
  const { allTickets } = useDocuments();
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusEnum>(StatusEnum.ALL);
  const [filteredTickets, setFilteredTickets] = useState<TicketInterface[]>(allTickets);

  useEffect(() => {
    if (titleFilter.length > 3 || statusFilter !== StatusEnum.ALL) {
      setFilteredTickets(
        allTickets.filter(
          (t) =>
            (titleFilter.length > 3 ? t.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
            (statusFilter === StatusEnum.ALL ? true : t.status === statusFilter) &&
            !t.assigneeId,
        ),
      );
    } else {
      setFilteredTickets(allTickets.filter((doc) => !doc.assigneeId));
    }
  }, [titleFilter, statusFilter, allTickets]);

  const sortedTickets = filteredTickets.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <div className="w-[95%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Unassigned Tickets</h1>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-[40%]">
            <p className="my-2 font-semibold">Search by Title</p>
            <input
              className="w-full p-2 placeholder-gray-300 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-1 focus:border-cyan-400 border-t-solid"
              onChange={(e) => {
                setTitleFilter(e.target.value);
              }}
              placeholder="Title"
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Status</p>
            <StatusDropDown statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          </div>
        </div>
      </div>
      <UnassignedTicketsTable documents={sortedTickets} />
    </div>
  );
};

export default UnassignedTickets;
