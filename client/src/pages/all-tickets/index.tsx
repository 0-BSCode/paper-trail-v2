import AssignedTickets from './components/AssignedTickets';
import Header from './components/Header';
import UnassignedTickets from './components/UnassignedTickets';

// TODO (Sam): Fill in
const AllTicketsPage = (): JSX.Element => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <AssignedTickets />
        <UnassignedTickets />
      </div>
    </div>
  );
};

export default AllTicketsPage;
