import { Input } from 'antd';
import TicketsTable from './TicketsTable';
import DropDown from './DropDown';
import useDocuments from '@src/hooks/useDocuments';

const UnassignedTickets = (): JSX.Element => {
  const { allDocuments } = useDocuments();

  console.log(allDocuments);

  return (
    <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
      <h1 className="m-0 text-xl font-bold">Unassigned Tickets</h1>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-[40%]">
            <p className="my-2 font-semibold">Search by Title</p>
            <Input placeholder="Title" style={{ width: '100%' }} />
          </div>
          <div className="flex flex-col mb-3">
            <p className="my-2 font-semibold ">Status</p>
            <DropDown />
          </div>
        </div>
      </div>
      <TicketsTable documents={allDocuments.filter((doc) => !doc.assigneeId)} />
    </div>
  );
};

export default UnassignedTickets;
