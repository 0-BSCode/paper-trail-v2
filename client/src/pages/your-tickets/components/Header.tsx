import Breadcrumbs from './Breadcrumbs';

const Header = (): JSX.Element => (
  <div className="w-full h-fit bg-white-100 flex flex-col gap-2 px-[2rem] py-[1.3rem]">
    <Breadcrumbs />
    <h1 className="m-0 text-3xl font-bold">Ticket Tracker</h1>
  </div>
);

export default Header;
