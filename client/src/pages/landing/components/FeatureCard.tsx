interface FeatureCardProps {
  iconSrc: string;
  iconAltText: string;
  title: string;
  body: string;
}

function FeatureCard({ iconSrc, iconAltText, title, body }: FeatureCardProps): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center text-white">
      <div className="flex items-center justify-center w-16 h-16 p-4 bg-white rounded-full">
        <img src={iconSrc} alt={iconAltText} />
      </div>
      <h3 className="mt-8 mb-4 text-lg font-medium">{title}</h3>
      <p className="leading-8">{body}</p>
    </div>
  );
}

export default FeatureCard;
