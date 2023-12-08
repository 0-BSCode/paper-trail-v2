/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../services/auth-service';
import useLocalStorage from '../useLocalStorage';
import jwt_decode from 'jwt-decode';
import type Token from '../../types/interfaces/token';

interface AuthHookType {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  loadingAuth: boolean;
  errors: string[];
  userId: number | null;
  email: string | null;
  roles: string[] | null;
  fullName: string | null;
  login: (accessToken: string, refreshToken: string, setSilentRefresh: boolean) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const useAuth = (): AuthHookType => {
  const {
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    loadingAuth,
    setLoadingAuth,
    errors,
    userId,
    setUserId,
    email,
    setEmail,
    roles,
    setRoles,
    fullName,
    setFullName,
  } = useContext(AuthContext);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

  const login = (accessToken: string, refreshToken: string, setSilentRefresh: boolean = true): void => {
    const { exp, id, email, roles, fullName } = jwt_decode<Token>(accessToken);
    setUserId(id);
    setEmail(email);
    setRoles(roles);
    setFullName(fullName);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    if (setSilentRefresh) {
      silentRefresh(exp);
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    const token = localStorage.getItem('refreshToken');
    if (token === null) {
      destroyAuth();
      setLoadingAuth(false);
      return;
    }
    setLoadingAuth(true);
    try {
      const response = await AuthService.refreshToken({ token: JSON.parse(token) });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      login(newAccessToken, newRefreshToken);
    } catch (error) {
      destroyAuth();
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (!accessToken) return;
    try {
      await AuthService.logout(accessToken);
    } catch {
    } finally {
      destroyAuth();
    }
  };

  const silentRefresh = (exp: number): void => {
    const msExpiration = Math.abs(new Date().getTime() - new Date(exp * 1000).getTime());
    setTimeout(() => {
      void refreshAccessToken();
    }, msExpiration);
  };

  const destroyAuth = (): void => {
    setRefreshToken(null);
    setAccessToken(null);
    setUserId(null);
    setEmail(null);
    setRoles(null);
    setFullName(null);
    setIsAuthenticated(false);
  };

  return {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
    roles,
    fullName,
    login,
    logout,
    refreshAccessToken,
  };
};

export default useAuth;
