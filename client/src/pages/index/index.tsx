import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import LandingFooter from './components/LandingFooter';

function index(): JSX.Element {
  return (
    <div>
      <LandingHeader />
      <main className="px-24 my-8">
        <HeroSection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default index;
