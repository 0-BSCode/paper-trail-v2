import { Breadcrumb } from 'antd';

const Breadcrumbs = (): JSX.Element => (
  <Breadcrumb
    items={[
      {
        title: <p className="inline">Tickets</p>,
      },
      {
        title: <p className="inline font-semibold text-black">All Tickets</p>,
      },
    ]}
  />
);

export default Breadcrumbs;
