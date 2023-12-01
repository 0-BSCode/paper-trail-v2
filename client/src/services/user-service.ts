import type RoleEnum from '@src/types/enums/role-enum';
import type User from '@src/types/interfaces/user';
import API from './api';

const UserService = {
  fetchByRole: async (accessToken: string, roles: RoleEnum[]) => {
    return await API.get(`user/role/${roles.join(',')}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  fetchAllUsers: async (accessToken: string) => {
    return await API.get('user/all', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getUserById: async (accessToken: string, userId: string | number) => {
    const { data } = await API.get(`user/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  },
  updateUserDetails: async (
    accessToken: string,
    userId: string | number,
    newDetails: Pick<User, 'fullName' | 'contactNumber' | 'courseAndYear' | 'studentIdNumber'>,
  ) => {
    const { data } = await API.patch(`user/${userId}`, newDetails, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  },
  updateUserRoles: async (accessToken: string, userId: string | number, newRoles: string[]) => {
    const { data } = await API.patch(
      `user/${userId}/role`,
      { roles: newRoles },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return data;
  },
};

export default UserService;
