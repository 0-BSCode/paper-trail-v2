import type RoleInterface from './role';

interface UserInterface {
  id: number;
  email: string;
  roles?: RoleInterface[];
  fullName: string;
  contactNumber: string;
  courseAndYear: string;
  studentIdNumber: string;
}

export default UserInterface;
