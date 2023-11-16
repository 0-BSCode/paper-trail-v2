import { Breadcrumb } from 'antd';

const Breadcrumbs = (): JSX.Element => (
  <Breadcrumb
    items={[
      {
        title: <a href="">Tickets</a>,
      },
      {
        title: (
          <a style={{ color: 'black' }} className="font-semibold" href="">
            All Tickets
          </a>
        ),
      },
    ]}
  />
);

export default Breadcrumbs;
