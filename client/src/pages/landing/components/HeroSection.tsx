import Illustration from '@src/assets/hero-illustration.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function HeroSection(): JSX.Element {
  return (
    <section className="grid px-24 grid-cols-2 h-[calc(100lvh-64px)]">
      <div className="relative flex flex-col justify-center gap-4 -top-16">
        <h2 className="text-6xl my-1 font-bold leading-[4rem]">Swift Conflict Resolution Made Easy</h2>
        <p className="leading-8">
          No more guesswork or frustration when it comes to resolving issues. You&lsquo;ll be able to track the status
          of your grievances in real-time, knowing exactly where your concern stands in the resolution process.
          It&lsquo;s your ticket to clarity and confidence!
        </p>
        <div className="flex gap-3">
          <Link to="/register">
            <Button size="large" type="primary">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="large">Log In</Button>
          </Link>
        </div>
      </div>
      <img className="place-self-center" src={Illustration} alt="Girl Riding a Rocket Ship with a Thumbs-up" />
    </section>
  );
}

export default HeroSection;
