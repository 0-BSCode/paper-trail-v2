import { useNavigate } from 'react-router-dom';

interface Props {
  message: string;
  url: string;
  closeModal: () => void;
  markAsRead: () => Promise<void>;
}

const NotificationMessage = ({ message, url, closeModal, markAsRead }: Props): JSX.Element => {
  const navigate = useNavigate();
  const titleRegex = /"(.*?)"/; // Regular expression to match the first word within quotations
  const match = message.match(titleRegex);

  const handleClick = async (): Promise<void> => {
    await markAsRead();
    closeModal();
    navigate(url);
  };

  if (!match?.[1]) {
    // Return the original message wrapped in a <span> if no title found
    return (
      <a
        onClick={() => {
          void handleClick();
        }}
        className="text-black"
      >
        {message}
      </a>
    );
  }

  const title = match[1];
  const updatedMessage = message.replace(titleRegex, `<strong>${title}</strong>`);

  return (
    <a
      onClick={() => {
        void handleClick();
      }}
      className="text-black"
      dangerouslySetInnerHTML={{ __html: updatedMessage }}
    />
  );
};

export default NotificationMessage;
