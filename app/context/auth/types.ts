export interface User {
  email: string;
  name: string;
  profilePicture?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
