import LogoWhite from '@src/assets/logo-white.svg';

function LandingFooter(): JSX.Element {
  return (
    <footer className="flex flex-col items-center py-12 mt-auto text-white bg-black">
      <div className="flex flex-col items-center gap-4">
        <img className="w-16" src={LogoWhite} alt="Wordmark Logo of Paper Trail" />
        <span className="text-5xl font-semibold">Paper Trail</span>
      </div>
      <hr className="w-3/4 my-8 border-white-900" />
      <div className="text-center">Copyright &copy;2023 Paper Trail</div>
    </footer>
  );
}

export default LandingFooter;
