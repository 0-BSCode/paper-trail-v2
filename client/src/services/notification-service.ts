import API from './api';
import type Notification from '@src/types/interfaces/notification';

const NotificationService = {
  getNoticications: async (accessToken: string): Promise<Notification[]> => {
    const { data } = await API.get('user/notification', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  },
  markNotificationAsRead: async (accessToken: string, id: string | number): Promise<void> => {
    await API.patch(
      `user/notification/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  },
};

export default NotificationService;
