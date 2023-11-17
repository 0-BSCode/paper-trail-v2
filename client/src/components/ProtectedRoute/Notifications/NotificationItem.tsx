interface PropTypes {
  message: string;
  isRead: boolean;
  createdAt: string;
}

function NotificationItem({ message, isRead, createdAt }: PropTypes): JSX.Element {
  const isReadStyles = 'border-red-500';

  return (
    <li
      className={`flex items-center gap-5 px-6 py-4 border-[1px] border-solid w-100 rounded-md border-neutral-300 shadow ${
        isRead && isReadStyles
      }`}
    >
      <img className="rounded-full w-26" src={getRandomImageUrl()} />
      <div className="flex items-center text-lg">
        <div>
          <p>{message}</p>
          <p className="font-semibold text-end">{formatTimeAgo(createdAt)}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * Generates placeholder profile pictures randomly.
 */
function getRandomImageUrl(): string {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const imageUrl = `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
  return imageUrl;
}

/**
 * Converts a given date string into a human-readable format representing elapsed time.
 *
 * @param dateString An ISO 8601 string with the "YYYY-MM-DD HH:mm:ss" format
 * @returns a formatted timestamp
 */
function formatTimeAgo(dateString: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
}

export default NotificationItem;
