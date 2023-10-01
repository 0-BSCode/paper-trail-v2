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
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => void;
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
  } = useContext(AuthContext);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

  const login = (accessToken: string, refreshToken: string): void => {
    const { exp, id, email } = jwt_decode<Token>(accessToken);
    silentRefresh(exp);
    setUserId(id);
    setEmail(email);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const refreshAccessToken = async (): Promise<void> => {
    if (refreshToken === null) {
      destroyAuth();
      setLoadingAuth(false);
      return;
    }
    try {
      const response = await AuthService.refreshToken({ token: refreshToken });
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
    login,
    logout,
    refreshAccessToken,
  };
};

export default useAuth;
