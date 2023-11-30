import { useState, useContext } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Avatar, List, Spin } from 'antd';
import { BellOutlined, InfoCircleFilled } from '@ant-design/icons';
import { ToastContext } from '@src/context/ToastContext';
import NotificationService from '@src/services/notification-service';
import type Notification from '@src/types/interfaces/notification';

const NotificationModal = (): JSX.Element => {
  const { userId, accessToken } = useAuth();
  const { error, success } = useContext(ToastContext);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);

  const fetchNotifications = async (): Promise<void> => {
    setIsLoading(true);
    const fetchedNotifications = await NotificationService.getNoticications(accessToken as string);
    setNotifications(
      fetchedNotifications.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA === timeB ? 0 : timeA < timeB ? 1 : -1;
      }),
    );
    setIsLoading(false);
  };

  const handleOpenNotificationsModal = async (): Promise<void> => {
    setIsNotificationsModalOpen(true);

    await fetchNotifications();
  };

  const handleClose = (): void => {
    setIsNotificationsModalOpen(false);
  };

  const handleMarkAsRead = async (): Promise<void> => {
    if (userId === null || accessToken === null) {
      error('Please log in.');
      return;
    }

    if (notifications === undefined) {
      return;
    }

    for (let i = 0; i < notifications?.length; i++) {
      await NotificationService.markNotificationAsRead(accessToken, notifications[i].id);
    }
    success('Successfully marked notifications as read.');

    void fetchNotifications();
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button type="link" size="middle" onClick={handleOpenNotificationsModal}>
        <BellOutlined />
      </Button>
      <Modal
        title="Notifications"
        open={isNotificationsModalOpen}
        okText={'Mark as Read'}
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onOk={handleMarkAsRead}
        cancelText={'Close'}
        onCancel={handleClose}
        width={1000}
      >
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                />
                <div className="flex flex-col w-full ml-2">
                  <div>
                    <p className="w-full text-lg">
                      {!item.isRead && <InfoCircleFilled className="text-[#ce3131] me-2" />}
                      {item.message}
                    </p>
                    <p className="font-semibold text-end">{formatTimeAgo(item.createdAt)}</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
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
