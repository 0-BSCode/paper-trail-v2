import API from './api';

const AuthService = {
  login: async (payload: { email: string; password: string }) => {
    return await API.post('auth/login', payload);
  },
  register: async (payload: { email: string; password1: string; password2: string }) => {
    return await API.post('user', payload);
  },
  refreshToken: async (payload: { token: string }) => {
    return await API.post('auth/refresh-token', payload);
  },
  logout: async (accessToken: string) => {
    return await API.delete('auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  verifyEmail: async (token: string) => {
    return await API.put(`auth/verify-email/${token}`);
  },
  getUser: async (accessToken: string, userId: number) => {
    return await API.get(`user/{${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default AuthService;
