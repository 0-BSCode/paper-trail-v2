import LogoWhite from '@src/assets/logo-white.svg';
import { Link } from 'react-router-dom';

function WordmarkLogo(): JSX.Element {
  return (
    <Link to="/home">
      <div className="flex items-center gap-4 text-2xl font-medium text-center">
        <img width={30} src={LogoWhite} alt="Wordmark Logo of Paper Trail" />
        <h1 className="text-3xl font-bold text-white">Paper Trail</h1>
      </div>
    </Link>
  );
}

export default WordmarkLogo;
