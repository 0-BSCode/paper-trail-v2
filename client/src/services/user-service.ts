import type RoleEnum from '@src/types/enums/role-enum';
import API from './api';

const UserService = {
  fetchByRole: async (accessToken: string, role: RoleEnum) => {
    return await API.get(`user/role/${role}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  fetchAllUsers: async (accessToken: string) => {
    return await API.get(`user/all`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default UserService;
