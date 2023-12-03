import DropDown from './DropDown';
import AssignedTicketsTable from './AssignedTicketsTable';
import useDocuments from '@src/hooks/useDocuments';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';
import StatusEnum from '@src/types/enums/status-enum';

const AssignedTickets = (): JSX.Element => {
  const { allTickets } = useDocuments();
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [dropDownFilter, setDropDownFilter] = useState<StatusEnum>(StatusEnum.ALL);
  const [filteredTickets, setFilteredTickets] = useState<TicketInterface[]>(allTickets);

  useEffect(() => {
    if (titleFilter.length > 3 || assigneeFilter.length > 3 || dropDownFilter !== StatusEnum.ALL) {
      setFilteredTickets(
        allTickets.filter(
          (t) =>
            (titleFilter.length > 3 ? t.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
            (assigneeFilter.length > 3
              ? t.assignee?.email.toLowerCase().includes(assigneeFilter.toLowerCase())
              : true) &&
            (dropDownFilter === StatusEnum.ALL ? true : t.status === dropDownFilter) &&
            t.assigneeId,
        ),
      );
    } else {
      setFilteredTickets(allTickets.filter((doc) => doc.assigneeId !== null));
    }
  }, [titleFilter, assigneeFilter, dropDownFilter, allTickets]);

  return (
    <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">All Tickets</h1>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-[30%]">
            <p className="my-2 font-semibold ">Search by Title</p>
            <input
              className="w-full p-2 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-1 focus:border-cyan-400 border-t-solid"
              onChange={(e) => {
                setTitleFilter(e.target.value);
              }}
              placeholder="Title"
            />
          </div>
          <div className="flex flex-col w-[30%]">
            <p className="my-2 font-semibold ">Search by Assignee</p>
            <input
              className="w-full p-2 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-1 focus:border-cyan-400 border-t-solid"
              onChange={(e) => {
                setAssigneeFilter(e.target.value);
              }}
              placeholder="Assignee"
            />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Status</p>
            <DropDown dropDownFilter={dropDownFilter} setDropDownFilter={setDropDownFilter} />
          </div>
        </div>
      </div>
      <AssignedTicketsTable documents={filteredTickets} />
    </div>
  );
};

export default AssignedTickets;
