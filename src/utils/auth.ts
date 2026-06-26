import type { User } from '../types/userSchema';

const CURRENT_USER_KEY = 'currentUser';

export const setCurrentUser = (user: User): void => {
  const { password: _password, ...safeUser } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  const raw = localStorage.getItem(CURRENT_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
