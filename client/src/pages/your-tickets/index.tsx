import YourTickets from './components/YourTickets';
import Header from './components/Header';
import SharedTickets from './components/SharedTickets';

const YourTicketsPage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-fit bg-[#f4f5ff]">
      <Header />
      <div className="flex flex-col items-center justify-center h-full py-8 gap-9">
        <YourTickets />
        <SharedTickets />
      </div>
    </div>
  );
};

export default YourTicketsPage;
