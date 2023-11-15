import AssignedTickets from './components/AssignedTickets';
import Header from './components/Header';
import UnassignedTickets from './components/UnassignedTickets';

// TODO (Sam): Fill in
const AllTicketsPage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-fit bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-col items-center justify-center h-full gap-5 py-8">
        <AssignedTickets />
        <UnassignedTickets />
      </div>
    </div>
  );
};

export default AllTicketsPage;
