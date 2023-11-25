import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import useAuth from '../useAuth';
import type UserInterface from '@src/types/interfaces/user';
import UserService from '@src/services/user-service';

interface UserHookType {
  allUsers: UserInterface[];
  currentUser: UserInterface;
  loading: boolean;
  setAllUsers: Dispatch<SetStateAction<UserInterface[]>>;
  setCurrentUser: Dispatch<SetStateAction<UserInterface>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const useUsers = (): UserHookType => {
  const { accessToken, userId } = useAuth();
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInterface>({});

  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadUsers = async (accessToken: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await UserService.fetchAllUsers(accessToken);
      setAllUsers(response.data as UserInterface[]);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setCurrentUser(allUsers.filter((user) => user.id === userId)[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    void loadUsers(accessToken);
  }, [accessToken]);

  return {
    allUsers,
    currentUser,
    loading,
    setAllUsers,
    setCurrentUser,
    setLoading,
  };
};

export default useUsers;
