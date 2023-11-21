import type RoleInterface from './role';

interface UserInterface {
  id: number;
  email: string;
  roles?: RoleInterface[];
}

export default UserInterface;
