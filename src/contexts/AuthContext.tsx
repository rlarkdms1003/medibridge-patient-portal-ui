import { createContext, useContext, useState, type ReactNode } from 'react';

const AUTH_STORAGE_KEY = 'snuh-portal-auth';
const USER_STORAGE_KEY = 'snuh-portal-user';

export type UserProfile = {
  name: string;
  patientNumber?: string;
  phone?: string;
  birthDate?: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const defaultUser: UserProfile = {
  name: '환자',
};

function loadStoredUser(): UserProfile | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

function persistUser(user: UserProfile) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );
  const [user, setUser] = useState<UserProfile | null>(() =>
    localStorage.getItem(AUTH_STORAGE_KEY) === 'true' ? loadStoredUser() ?? defaultUser : null,
  );

  const login = (profile: UserProfile) => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    persistUser(profile);
    setIsLoggedIn(true);
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      persistUser(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
