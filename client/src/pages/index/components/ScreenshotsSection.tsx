import Assistance from '@src/assets/assistance-picture.png';
import Notifications from '@src/assets/notifications-picture.png';

function ScreenshotsSection(): JSX.Element {
  return (
    <section className="flex flex-col justify-center px-24 my-8 mt-5 h-[calc(100lvh-64px)]">
      <div className="flex justify-center gap-4 items-center">
        <img src={Assistance} alt="Girl Riding a Rocket Ship with a Thumbs-up" />
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold leading-[4rem]">One-on-one assistance</h2>
          <p className="max-w-prose">
            You can conveniently communicate with CISCO officers via our chat system to address and resolve your issues.
            Any messages sent will be forwarded to the parties involved in the ticket.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4 items-center">
        <div className="flex flex-col">
          <h2 className="text-5xl font-bold leading-[4rem] ">Email notifications</h2>
          <p className="max-w-prose justify-start">
            All app notifications are automatically sent to your registered email addresses, ensuring easy access to
            information even when you're not in the app.
          </p>
        </div>
        <img src={Notifications} alt="Girl Riding a Rocket Ship with a Thumbs-up" />
      </div>
    </section>
  );
}

export default ScreenshotsSection;
