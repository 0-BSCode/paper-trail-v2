import WordmarkLogo from '@src/components/WordmarkLogo';
import { Header } from 'antd/es/layout/layout';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

function LandingHeader(): JSX.Element {
  return (
    <Header className="h-fit">
      <Flex className="items-center justify-between">
        <WordmarkLogo />
        <div className="flex gap-1">
          <Link to="/register">
            <Button type="primary" size="middle" className="text-white">
              Register Now
            </Button>
          </Link>
        </div>
      </Flex>
    </Header>
  );
}

export default LandingHeader;
