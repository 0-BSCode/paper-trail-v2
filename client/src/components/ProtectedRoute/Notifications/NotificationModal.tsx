import { useState } from 'react';
import useAuth from '@src/hooks/useAuth';
import { Modal, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import NotificationItem from './NotificationItem';

function NotificationModal(): JSX.Element {
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const { userId } = useAuth();

  const handleOpenNotificationsModal = (): void => {
    setIsNotificationsModalOpen(true);
    console.log('Fetching notifications for userId:', userId);
  };

  const handleClose = (): void => {
    setIsNotificationsModalOpen(false);
  };

  const handleMarkAsRead = (): void => {
    console.log('Marking notifications as read...');
    // add logic here when backend is integrated
    window.alert('This should be a toast: "Successfully marked notifications as read."');
  };

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
        <ul className="grid gap-4 px-0 my-8">
          <NotificationItem
            message={`Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`}
            isRead={false}
            createdAt="2023-11-17 08:43:47"
          />
          <NotificationItem
            message={`Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`}
            isRead={false}
            createdAt="2023-10-17 08:43:47"
          />
          <NotificationItem
            message={`Your ticket "I Want to Appeal My Grades" has a new comment from christian.dejesus: "The teacher has approved this and will act accordingly".`}
            isRead={false}
            createdAt="2022-11-17 08:43:47"
          />
        </ul>
      </Modal>
    </>
  );
}

export default NotificationModal;
