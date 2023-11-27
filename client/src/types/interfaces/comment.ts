import type UserInterface from './user';

interface CommentInterface {
  id: number;
  content: string;
  user: UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

export default CommentInterface;
