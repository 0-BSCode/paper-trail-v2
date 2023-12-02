// TODO: Unify this w/ TicketInterface (they're referring to the same entity)
import type StatusEnum from '../enums/status-enum';
import type DocumentUser from './document-user';

interface DocumentInterface {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  owner: { id: number; fullName: string; email: string };
  userId: number;
  users: DocumentUser[];
  assigneeId: number | null;
  status: StatusEnum;
  isPublic: boolean;
}

export default DocumentInterface;
