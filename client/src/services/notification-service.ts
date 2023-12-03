import API from './api';
import type Notification from '@src/types/interfaces/notification';

const NotificationService = {
  getNoticications: async (accessToken: string): Promise<Notification[]> => {
    const { data } = await API.get('user/notification', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const createdTicketMessagePattern = /^A new Ticket #\d+ was created: \[.*\]\.$/;
    const processedData = (data as Notification[]).map((n) => {
      if (createdTicketMessagePattern.test(n.message)) {
        return { ...n, message: `A new ticket was created: "${n.document.title}".` };
      } else {
        return n;
      }
    });

    return processedData;
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
