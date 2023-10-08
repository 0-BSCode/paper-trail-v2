import Illustration from '@src/assets/hero-illustration.png';
import ContainedButton from '../../../components/ContainedButton';
import OutlinedButton from '../../../components/OutlinedButton';

function HeroSection(): JSX.Element {
  const handleGetStartedClick = (): void => {
    window.alert('You clicked the Get Started Button in the HeroSection.tsx component');
  };

  const handleLogInClick = (): void => {
    window.alert('You clicked the Log In Button in the HeroSection.tsx component');
  };

  return (
    <section className="grid px-24 grid-cols-2 h-[calc(100lvh-64px)]">
      <div className="relative flex flex-col justify-center gap-4 -top-16">
        <h2 className="text-6xl font-bold leading-[4rem]">Switft Conflict Resolution Made Easy</h2>
        <p className="leading-8">
          No more guesswork or frustration when it comes to resolving issues. You&lsquo;ll be able to track the status
          of your grievances in real-time, knowing exactly where your concern stands in the resolution process.
          It&lsquo;s your ticket to clarity and confidence!
        </p>
        <div className="flex gap-4">
          <ContainedButton onClick={handleGetStartedClick}>Get Started</ContainedButton>
          <OutlinedButton onClick={handleLogInClick}>Log In</OutlinedButton>
        </div>
      </div>
      <img src={Illustration} alt="Girl Riding a Rocket Ship with a Thumbs-up" />
    </section>
  );
}

export default HeroSection;
