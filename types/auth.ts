export interface LoginDto {
  user?: User | null;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}
