import type { User } from '../types/userSchema';

export const getUsers = (): User[] => {
  const raw = localStorage.getItem('users');

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const userExists = (users: User[], email: string) => {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
};
