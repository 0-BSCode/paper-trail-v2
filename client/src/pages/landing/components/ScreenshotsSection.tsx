import Assistance from '@src/assets/assistance-screenshot.png';
import Notifications from '@src/assets/notifications-screenshot.png';

function ScreenshotsSection(): JSX.Element {
  return (
    <section className="flex flex-col justify-center gap-24 px-24 my-32">
      <div className="flex items-center justify-center gap-16">
        <img
          className="rounded-lg shadow-[0_8px_64px_16px_rgba(0,0,0,0.1)]"
          src={Assistance}
          alt="A Chatroom User Interface For Sending Messages"
        />
        <div className="flex flex-col">
          <h2 className="mb-4 text-5xl font-bold">One-on-one Assistance</h2>
          <p className="leading-8">
            You can conveniently communicate with CISCO officers via our chat system to address and resolve your issues.
            Any messages sent will be forwarded to the parties involved in the ticket.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-64">
        <div className="flex flex-col">
          <h2 className="mb-4 text-5xl font-bold">Real-time Notifications</h2>
          <p className="justify-start leading-8">
            All app notifications are automatically sent to you through our website&apos;s real-time notification
            system, <br /> ensuring easy access to information while you are using the app.
          </p>
        </div>
        <img
          className="rounded-lg shadow-[0_8px_64px_16px_rgba(0,0,0,0.1)]"
          src={Notifications}
          alt="A Notification Drawer with Multiple Messages"
        />
      </div>
    </section>
  );
}

export default ScreenshotsSection;
