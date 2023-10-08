import LogoWhite from '@src/assets/logo-white.svg';

function WordmarkLogo(): JSX.Element {
  return (
    <div className="flex items-center gap-4 text-2xl font-medium">
      <img className="w-8" src={LogoWhite} alt="Logo" />
      Paper Trail
    </div>
  );
}

export default WordmarkLogo;
