import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import ScreenshotsSection from './components/ScreenshotsSection';
import FeatureSection from './components/FeatureSection';
import LandingFooter from './components/LandingFooter';

function index(): JSX.Element {
  return (
    <div>
      <LandingHeader />
      <main className="my-8">
        <HeroSection />
        <FeatureSection />
      </main>
      <ScreenshotsSection />
      <LandingFooter />
    </div>
  );
}

export default index;
