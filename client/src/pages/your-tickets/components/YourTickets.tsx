import StatusDropDown from './StatusDropDown';
import { Button } from 'antd';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';
import StatusEnum from '@src/types/enums/status-enum';
import { useNavigate } from 'react-router-dom';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import { ToastContext } from '@src/context/ToastContext';
import YourTicketsTable from './YourTicketsTable';
import AssigneeDropDown from '@src/components/AssigneeDropDown';

const YourTickets = (): JSX.Element => {
  const navigate = useNavigate();
  const { error } = useContext(ToastContext);
  const { userId, accessToken } = useAuth();
  const { allTickets } = useDocuments();
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusEnum>(StatusEnum.ALL);
  const [filteredTickets, setFilteredTickets] = useState<TicketInterface[]>(allTickets);
  const [loading, setLoading] = useState(false);

  const handleDocumentCreateBtnClick = async (): Promise<void> => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      const response = await DocumentService.create(accessToken);
      const { id } = response.data as DocumentInterface;

      navigate(`/document/${id}`);
    } catch (err) {
      error('Unable to create a new document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (titleFilter.length > 3 || assigneeFilter || statusFilter !== StatusEnum.ALL) {
      setFilteredTickets(
        allTickets.filter(
          (t) =>
            (titleFilter.length > 3 ? t.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
            (assigneeFilter ? t.assignee?.email.toLowerCase().includes(assigneeFilter.toLowerCase()) : true) &&
            (statusFilter === StatusEnum.ALL ? true : t.status === statusFilter) &&
            t.userId === userId,
        ),
      );
    } else {
      setFilteredTickets(allTickets.filter((doc) => doc.userId === userId));
    }
  }, [titleFilter, assigneeFilter, statusFilter, allTickets]);

  const sortedTickets = filteredTickets.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="w-[95%] h-full bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <div className="flex items-center justify-between">
        <h1 className="m-0 text-xl font-bold">Your Tickets</h1>
        <Button
          type="primary"
          disabled={loading}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            await handleDocumentCreateBtnClick();
          }}
        >
          Create Ticket
        </Button>
      </div>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-[30%]">
            <p className="my-2 font-semibold ">Search by Title</p>
            <input
              className="w-full p-2 placeholder-gray-300 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-1 focus:border-cyan-400 border-t-solid"
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
      <YourTicketsTable documents={sortedTickets} />
    </div>
  );
};

export default YourTickets;
