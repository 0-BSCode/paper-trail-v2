import type DocumentUser from './document-user';

interface TicketInterface {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  users: DocumentUser[];
  assigneeId: number;
  isPublic: boolean;
  owner: { email: string };
  assignee: { email: string };
  status: string;
}

export default TicketInterface;
