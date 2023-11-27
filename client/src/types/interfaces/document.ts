import type StatusEnum from '../enums/status-enum';
import type DocumentUser from './document-user';

interface DocumentInterface {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  users: DocumentUser[];
  assigneeId: number;
  status: StatusEnum;
  isPublic: boolean;
}

export default DocumentInterface;
