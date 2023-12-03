import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import useAuth from '../useAuth';
import type UserInterface from '@src/types/interfaces/user';
import UserService from '@src/services/user-service';

interface UserHookType {
  allUsers: UserInterface[];
  loading: boolean;
  setAllUsers: Dispatch<SetStateAction<UserInterface[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reloadUsers: () => Promise<void>;
}

const useUsers = (): UserHookType => {
  const { accessToken } = useAuth();
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);

  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadUsers = async (accessToken: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await UserService.fetchAllUsers(accessToken);
      const data: UserInterface[] = response.data;

      // Sort the array by the 'email' property in ascending order
      data.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();

        if (emailA < emailB) {
          return -1;
        }
        if (emailA > emailB) {
          return 1;
        }
        return 0;
      });

      setAllUsers(response.data as UserInterface[]);
    } catch (err) {
      error('Unable to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Used to refresh the loaded users in the user dashboard after manual updates.
   */
  const reloadUsers = async (): Promise<void> => {
    if (accessToken === null) {
      return;
    }

    await loadUsers(accessToken);
  };

  useEffect(() => {
    if (accessToken === null) return;

    void loadUsers(accessToken);
  }, [accessToken]);

  return {
    allUsers,
    loading,
    setAllUsers,
    setLoading,
    reloadUsers,
  };
};

export default useUsers;
