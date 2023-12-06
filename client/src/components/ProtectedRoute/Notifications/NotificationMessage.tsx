const NotificationMessage = ({ message }: { message: string }): JSX.Element => {
  const titleRegex = /"(.*?)"/; // Regular expression to match the first word within quotations
  const match = message.match(titleRegex);

  if (!match?.[1]) {
    // Return the original message wrapped in a <span> if no title found
    return <span>{message}</span>;
  }

  const title = match[1];
  const updatedMessage = message.replace(titleRegex, `<strong>${title}</strong>`);

  return <span dangerouslySetInnerHTML={{ __html: updatedMessage }} />;
};

export default NotificationMessage;
