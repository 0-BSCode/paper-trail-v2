import API from './api';

const AuthService = {
  login: async (payload: { email: string; password: string }) => {
    return await API.post('auth/login', payload);
  },
  register: async (payload: {
    email: string;
    password1: string;
    password2: string;
    studentIdNumber: string;
    fullName: string;
  }) => {
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
};

export default AuthService;
