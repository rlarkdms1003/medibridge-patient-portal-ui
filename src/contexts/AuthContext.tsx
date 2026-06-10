import { createContext, useContext, useState, type ReactNode } from 'react';

const AUTH_STORAGE_KEY = 'snuh-portal-auth';
const USER_STORAGE_KEY = 'snuh-portal-user';
const PASSWORD_STORAGE_KEY = 'snuh-portal-password';

export type LoginType = 'member' | 'guest';

export type UserProfile = {
  name: string;
  userId?: string;
  patientNumber?: string;
  phone?: string;
  loginType: LoginType;
};

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordResult = {
  success: boolean;
  message: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (profile: UserProfile, password?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  changePassword: (input: ChangePasswordInput) => ChangePasswordResult;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const defaultUser: UserProfile = {
  name: '회원',
  loginType: 'member',
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

function loadStoredPassword(): string {
  return localStorage.getItem(PASSWORD_STORAGE_KEY) ?? '';
}

function persistUser(user: UserProfile) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function persistPassword(password: string) {
  localStorage.setItem(PASSWORD_STORAGE_KEY, password);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );
  const [user, setUser] = useState<UserProfile | null>(() =>
    localStorage.getItem(AUTH_STORAGE_KEY) === 'true' ? loadStoredUser() ?? defaultUser : null,
  );

  const login = (profile: UserProfile, password?: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    persistUser(profile);
    if (profile.loginType === 'member' && password) {
      persistPassword(password);
    }
    setIsLoggedIn(true);
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(PASSWORD_STORAGE_KEY);
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

  const changePassword = ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: ChangePasswordInput): ChangePasswordResult => {
    if (!user || user.loginType !== 'member') {
      return { success: false, message: '정회원만 비밀번호를 변경할 수 있습니다.' };
    }

    const storedPassword = loadStoredPassword();

    if (storedPassword && storedPassword !== currentPassword) {
      return { success: false, message: '현재 비밀번호가 일치하지 않습니다.' };
    }

    if (!storedPassword && currentPassword) {
      return { success: false, message: '현재 비밀번호가 일치하지 않습니다.' };
    }

    if (newPassword.length < 4) {
      return { success: false, message: '새 비밀번호는 4자 이상 입력해 주세요.' };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' };
    }

    if (storedPassword && newPassword === currentPassword) {
      return { success: false, message: '새 비밀번호는 현재 비밀번호와 달라야 합니다.' };
    }

    persistPassword(newPassword);
    return { success: true, message: '비밀번호가 변경되었습니다.' };
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser, changePassword }}>
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
