import TicketsTable from './TicketsTable';

const AssignedTickets = (): JSX.Element => (
  <div className="w-[90%] h-[45%] bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
    <h1 className="m-0 text-xl font-bold">Your Tickets</h1>
    <TicketsTable />
  </div>
);

export default AssignedTickets;
