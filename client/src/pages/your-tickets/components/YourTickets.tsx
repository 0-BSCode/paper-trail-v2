import DropDown from './DropDown';
import TicketsTable from './TicketsTable';
import { Input, Button } from 'antd';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';
import StatusEnum from '@src/types/enums/status-enum';
import { useNavigate } from 'react-router-dom';
import DocumentService from '@src/services/document-service';
import type DocumentInterface from '@src/types/interfaces/document';
import { ToastContext } from '@src/context/ToastContext';

const YourTickets = (): JSX.Element => {
  const navigate = useNavigate();
  const { error } = useContext(ToastContext);
  const { userId, accessToken } = useAuth();
  const { allTickets } = useDocuments();
  const [filtered, setFiltered] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dropDownFilter, setDropDownFilter] = useState<StatusEnum>(StatusEnum.ALL);
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
    if (titleFilter.length > 3 || dropDownFilter !== StatusEnum.ALL) {
      setFiltered(true);

      setFilteredTickets(
        allTickets.filter(
          (tic) =>
            (titleFilter.length > 3 ? tic.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
            (dropDownFilter === StatusEnum.ALL ? true : tic.status === dropDownFilter) &&
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
          <div className="flex  flex-col justify-start w-[40%]">
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
      <TicketsTable documents={filtered ? filteredTickets : allTickets.filter((doc) => doc.userId === userId)} />
    </div>
  );
};

export default YourTickets;
