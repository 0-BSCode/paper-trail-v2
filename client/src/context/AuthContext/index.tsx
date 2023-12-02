import { createContext, type Dispatch, type SetStateAction, useState } from 'react';

// TODO: Pack user info under an interface
export interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loadingAuth: boolean;
  setLoadingAuth: Dispatch<SetStateAction<boolean>>;
  errors: string[];
  setErrors: Dispatch<SetStateAction<string[]>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
  roles: string[] | null;
  setRoles: Dispatch<SetStateAction<string[] | null>>;
  fullName: string | null;
  setFullName: Dispatch<SetStateAction<string | null>>;
}

const defaultValues: AuthContextInterface = {
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setIsLoading: () => {},
  loadingAuth: true,
  setLoadingAuth: () => {},
  errors: [],
  setErrors: () => {},
  userId: null,
  setUserId: () => {},
  email: null,
  setEmail: () => {},
  roles: null,
  setRoles: () => {},
  fullName: null,
  setFullName: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(defaultValues.accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValues.isAuthenticated);
  const [loading, setIsLoading] = useState<boolean>(defaultValues.loading);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(defaultValues.loadingAuth);
  const [errors, setErrors] = useState<string[]>(defaultValues.errors);
  const [userId, setUserId] = useState<number | null>(defaultValues.userId);
  const [roles, setRoles] = useState<string[] | null>(defaultValues.roles);
  const [email, setEmail] = useState<string | null>(defaultValues.email);
  const [fullName, setFullName] = useState<string | null>(defaultValues.fullName);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setIsLoading,
        loadingAuth,
        setLoadingAuth,
        errors,
        setErrors,
        userId,
        setUserId,
        email,
        setEmail,
        roles,
        setRoles,
        fullName,
        setFullName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
