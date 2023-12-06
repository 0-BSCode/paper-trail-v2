import { useState, useContext, useEffect } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button, Avatar, List, Spin, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { ToastContext } from '@src/context/ToastContext';
import NotificationService from '@src/services/notification-service';
import type Notification from '@src/types/interfaces/notification';
import getAvatarImageUrlByEmail from '@src/utils/getAvatarImageUrlByEmail';
import formatTimeAgo from './formatTimeAgo';
import NotificationMessage from './NotificationMessage';

const NotificationModal = (): JSX.Element => {
  const { userId, accessToken } = useAuth();
  const { error, success } = useContext(ToastContext);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined);
  const unreadNotifications = notifications?.filter((n) => !n.isRead);

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

  const handleSingleMarkAsRead = async (notificationId: number): Promise<void> => {
    await NotificationService.markNotificationAsRead(accessToken as string, notificationId);
  };

  // Fetches only once to to display an indicator if there are any unread ones
  useEffect(() => {
    void fetchNotifications();
  }, []);

  return (
    <>
      <Badge size="small" count={unreadNotifications?.length} offset={[-8, 8]}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button title="Notifications" type="link" size="large" onClick={handleOpenNotificationsModal}>
          <BellOutlined />
        </Button>
      </Badge>
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
            style={{
              height: '420px',
              overflowY: 'auto',
              paddingRight: '20px',
            }}
            dataSource={unreadNotifications}
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={72} src={getAvatarImageUrlByEmail(item.sender.email)} className="ms-4" />}
                  />
                  <div className="flex flex-col w-full ml-2">
                    <div>
                      <p className="w-full text-lg">
                        <NotificationMessage
                          message={item.message}
                          url={`/document/${item.documentId}`}
                          closeModal={handleClose}
                          markAsRead={async () => {
                            await handleSingleMarkAsRead(item.id);
                          }}
                        />
                      </p>
                      <p className="font-semibold text-end">{formatTimeAgo(item.createdAt)}</p>
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default NotificationModal;
