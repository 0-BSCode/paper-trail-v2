import SharedTicketsTable from './SharedTicketsTable';
import StatusDropDown from './StatusDropDown';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';
import StatusEnum from '@src/types/enums/status-enum';
import AssigneeDropDown from './AssigneeDropDown';

const SharedTickets = (): JSX.Element => {
  const { allTickets } = useDocuments();
  const { userId } = useAuth();
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusEnum>(StatusEnum.ALL);
  const [filteredTickets, setFilteredTickets] = useState<TicketInterface[]>(allTickets);

  useEffect(() => {
    if (titleFilter.length > 3 || assigneeFilter || statusFilter !== StatusEnum.ALL) {
      setFilteredTickets(
        allTickets.filter(
          (t) =>
            (titleFilter.length > 3 ? t.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
            (assigneeFilter ? t.assignee?.email.toLowerCase().includes(assigneeFilter.toLowerCase()) : true) &&
            (statusFilter === StatusEnum.ALL ? true : t.status === statusFilter) &&
            t.users.some((u) => u.userId === userId),
        ),
      );
    } else {
      setFilteredTickets(allTickets.filter((doc) => doc.users.some((t) => t.userId === userId)));
    }
  }, [titleFilter, assigneeFilter, statusFilter, allTickets]);

  return (
    <div className="w-[95%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Shared Tickets</h1>
      <div className="flex flex-col">
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
            <AssigneeDropDown setAssigneeFilter={setAssigneeFilter} />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Status</p>
            <StatusDropDown statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          </div>
        </div>
      </div>
      <SharedTicketsTable
        documents={filteredTickets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())}
      />
    </div>
  );
};

export default SharedTickets;
