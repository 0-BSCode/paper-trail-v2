import { useNavigate } from 'react-router-dom';

interface Props {
  message: string;
  url: string;
  closeModal: () => void;
}

const NotificationMessage = ({ message, url, closeModal }: Props): JSX.Element => {
  const navigate = useNavigate();
  const titleRegex = /"(.*?)"/; // Regular expression to match the first word within quotations
  const match = message.match(titleRegex);

  const handleClick = (): void => {
    closeModal();
    navigate(url);
  };

  if (!match?.[1]) {
    // Return the original message wrapped in a <span> if no title found
    return (
      <a onClick={handleClick} className="text-black">
        {message}
      </a>
    );
  }

  const title = match[1];
  const updatedMessage = message.replace(titleRegex, `<strong>${title}</strong>`);

  return <a onClick={handleClick} className="text-black" dangerouslySetInnerHTML={{ __html: updatedMessage }} />;
};

export default NotificationMessage;
