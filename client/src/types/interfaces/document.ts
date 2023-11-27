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
  isPublic: boolean;
}

export default DocumentInterface;
