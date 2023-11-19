import React from 'react';
import YourTickets from './components/YourTickets';
import Header from './components/Header';
import SharedTickets from './components/SharedTickets';

const YourTicketsPage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-fit bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-col items-center justify-center h-full gap-5 py-8">
        <YourTickets />
        <SharedTickets />
      </div>
    </div>
  );
};

export default YourTicketsPage;
