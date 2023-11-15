import { Breadcrumb } from 'antd';

const Breadcrumbs = (): JSX.Element => (
  <Breadcrumb
    items={[
      {
        title: <a href="">Tickets</a>,
      },
      {
        title: (
          <a className="text-black" href="">
            All Tickets
          </a>
        ),
      },
    ]}
  />
);

export default Breadcrumbs;
