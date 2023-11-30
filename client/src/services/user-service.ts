import type RoleEnum from '@src/types/enums/role-enum';
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
};

export default UserService;
