import { Input } from 'antd';
import TicketsTable from './TicketsTable';
import DropDown from './DropDown';

const UnassignedTickets = (): JSX.Element => (
  <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
    <h1 className="m-0 text-xl font-bold">Unassigned Tickets</h1>
    <div className="flex flex-col ">
      <div className="flex justify-between">
        <p className="font-semibold">Search by Title</p>
        <div className="flex w-[49%] justify-start">
          <p className="font-semibold">Status</p>
        </div>
      </div>
      <div className="flex gap-3 mb-3">
        <Input placeholder="Title" style={{ width: '50%' }} />
        <DropDown />
      </div>
    </div>
    <TicketsTable />
  </div>
);

export default UnassignedTickets;
