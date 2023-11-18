import { Input } from 'antd';
import TicketsTable from './TicketsTable';
import DropDown from './DropDown';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';
import { useEffect, useState } from 'react';
import type TicketInterface from '@src/types/interfaces/ticket';

const SharedTickets = (): JSX.Element => {
  const [titleFilter, setTitleFilter] = useState<null | string>(null);
  const { allTickets } = useDocuments();
  const { userId } = useAuth();

  let tickets: TicketInterface[] = allTickets.filter((doc) => doc.users.some((tic) => tic.userId === userId));

  useEffect(() => {
    if (!titleFilter) return;

    if (titleFilter.length > 3) {
      tickets = tickets.filter((tic) => tic.title.includes(titleFilter));
    }
  }, [titleFilter]);

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
            <DropDown />
          </div>
        </div>
      </div>
      <TicketsTable documents={tickets} />
    </div>
  );
};

export default SharedTickets;
