import FeatureCard from './FeatureCard';

import EmailFastIcon from '@src/assets/icons/email-fast.svg';
import AccountEditIcon from '@src/assets/icons/account-edit.svg';
import ViewDashboardIcon from '@src/assets/icons/view-dashboard.svg';

function FeaturesSection(): JSX.Element {
  return (
    <section className="relative flex flex-col items-center gap-8 px-32 py-20 text-white bg-blue-500">
      <div className="text-center">
        <h2 className="text-5xl font-bold leading-[4rem] mb-4">No more endless emails</h2>
        <p className="leading-8">
          Put an end to the repetitive back-and-forth communication efforts with your teacher - effortlessly track your
          ticket <br /> and receive instant notifications for updates. You can view a public list ofi issues and join
          the conversation.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-32 mt-12">
        <FeatureCard
          title="Ticket Dashboard"
          body="Experience real-time ticket processing through a comprehensive dashboard, conveniently centralizing all your concerns under your complete control."
          iconSrc={ViewDashboardIcon}
          iconAltText="Dashboard Views"
        />
        <FeatureCard
          title="Direct Messaging"
          body="Bridging the communication gap between students and teachers, our messaging system offers quick, efficient, and hassle-free interactions."
          iconSrc={EmailFastIcon}
          iconAltText="Fast Messaging"
        />
        <FeatureCard
          title="Collaborative Editing"
          body="Collaborative ticket editing empowers students to address conflicts collectively, enhancing transparency by providing context and evidence for swift issue resolution."
          iconSrc={AccountEditIcon}
          iconAltText="Write Together"
        />
      </div>
    </section>
  );
}

export default FeaturesSection;
