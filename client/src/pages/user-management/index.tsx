import Header from './components/Header';

const UserManagementPage = (): JSX.Element => {
  return (
    <div className="flex flex-col h-fit bg-[#f5f5f5]">
      <Header />
      <div className="flex flex-col items-center justify-center h-full gap-5 py-8"></div>
    </div>
  );
};

export default UserManagementPage;
