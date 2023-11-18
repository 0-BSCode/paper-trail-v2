import DropDown from './DropDown';
import TicketsTable from './TicketsTable';
import { Input } from 'antd';
import useDocuments from '@src/hooks/useDocuments';
import useAuth from '@src/hooks/useAuth';

const AssignedTickets = (): JSX.Element => {
  const { userId } = useAuth();
  const { allDocuments } = useDocuments();

  return (
    <div className="w-[90%] h-full bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Your Tickets</h1>
      <div className="flex flex-col ">
        <div className="flex gap-5">
          <div className="flex my-2  flex-col justify-start w-[40%]">
            <p className="font-semibold">Search by Title</p>
            <Input placeholder="Title" style={{ width: '100%' }} />
          </div>
          <div className="flex flex-col my-2 mb-3">
            <p className="font-semibold">Status</p>
            <DropDown />
          </div>
        </div>
      </div>
      <TicketsTable documents={allDocuments.filter((doc) => doc.assigneeId === userId)} />
    </div>
  );
};

export default AssignedTickets;
