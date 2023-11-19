import { useState } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Avatar, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationModal = (): JSX.Element => {
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const { userId } = useAuth();

  const handleOpenNotificationsModal = (): void => {
    setIsNotificationsModalOpen(true);
    // TODO (Ian): Add logic to fetch from backend and use Spinner component for isLoading
    console.log('Fetching notifications for userId:', userId);
  };

  const handleClose = (): void => {
    setIsNotificationsModalOpen(false);
  };

  const handleMarkAsRead = (): void => {
    console.log('Marking notifications as read...');
    // TODO (Ian): Integrate with Toaster implementation and handle backend mutation logic
    window.alert('This should be a toast: "Successfully marked notifications as read."');
  };

  // TODO (Ian): Remove once integrated with backend
  const mockData = [
    {
      message: `Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`,
      isRead: false,
      createdAt: '2023-11-17 08:43:47',
    },
    {
      message: `Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`,
      isRead: false,
      createdAt: '2023-10-17 08:43:47',
    },
    {
      message: `Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`,
      isRead: false,
      createdAt: '2022-11-17 08:43:47',
    },
  ];

  return (
    <>
      <Button type="link" size="middle" onClick={handleOpenNotificationsModal}>
        <BellOutlined />
      </Button>
      <Modal
        title="Notifications"
        open={isNotificationsModalOpen}
        okText={'Mark as Read'}
        onOk={handleMarkAsRead}
        cancelText={'Close'}
        onCancel={handleClose}
        width={1000}
      >
        <List
          itemLayout="horizontal"
          dataSource={mockData}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={64} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              />
              <div className="flex items-center ml-2">
                <div>
                  <p className="text-lg">{item.message}</p>
                  <p className="font-semibold text-end">{formatTimeAgo(item.createdAt)}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

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

export default NotificationModal;
