import LogoWhite from '@src/assets/logo-white.svg';
import { Image } from 'antd';

function WordmarkLogo(): JSX.Element {
  return (
    <div className="flex items-center gap-4 text-2xl font-medium text-center">
      <Image width={30} src={LogoWhite} alt="Wordmark Logo of Paper Trail" />
      <h1 className="text-3xl font-bold text-white">Paper Trail</h1>
    </div>
  );
}

export default WordmarkLogo;
