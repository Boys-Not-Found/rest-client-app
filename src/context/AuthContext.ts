import { createContext } from 'react';

export type AuthContextType = {
  loading: boolean;
  user: null | { uid: string; email: string | null; displayName: string | null };
};

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  user: null,
});
