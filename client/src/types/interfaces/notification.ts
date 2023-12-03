import type StatusEnum from '../enums/status-enum';

interface NotificationInterface {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  documentId: number;
  userId: number;
  user: { email: string; fullName: string };
  document: { title: string; status: StatusEnum };
}

export default NotificationInterface;
