// src/lib/auth/types.ts

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>; // Используем 'signUp'
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}


