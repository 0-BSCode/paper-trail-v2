import WordmarkLogo from '@src/components/WordmarkLogo';
import ContainedButton from '@src/components/ContainedButton';

function LandingHeader(): JSX.Element {
  const handleRegisterButtonClick = (): void => {
    window.alert('You clicked the Register Button in the LandingHeader.tsx component');
  };

  return (
    <header className="h-[64px] bg-black px-5 text-white flex justify-between shadow-md z-50 sticky top-0 w-full">
      <h1 className="flex">
        <WordmarkLogo />
      </h1>

      <div className="flex items-center">
        <ContainedButton onClick={handleRegisterButtonClick}>Register Now</ContainedButton>
      </div>
    </header>
  );
}

export default LandingHeader;
