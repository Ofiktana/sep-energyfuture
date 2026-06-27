import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  addUser,
  findUserByCredentials,
  findUserByName,
  getDB,
} from '../services/db';
import { generateId } from '../utils/helpers';

const SESSION_KEY = 'energy_user';

const AppContext = createContext(null);

function loadSessionUser() {
  const saved = sessionStorage.getItem(SESSION_KEY);
  if (!saved) return null;

  try {
    const user = JSON.parse(saved);
    const exists = getDB().users.find((u) => u.id === user.id);
    if (exists) return exists;
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadSessionUser());

  const login = useCallback((fullName, password) => {
    const found = findUserByCredentials(fullName, password);
    if (!found) {
      throw new Error('Invalid credentials. Please check your name and password.');
    }
    setUser(found);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(found));
  }, []);

  const signup = useCallback((fullName, affiliation, role, password) => {
    if (findUserByName(fullName)) {
      throw new Error('A user with that name already exists. Please log in.');
    }

    const newUser = {
      id: generateId(),
      fullName: fullName.trim(),
      affiliation: affiliation.trim(),
      role: role.trim(),
      password,
      isAdmin: false,
    };

    addUser(newUser);
    setUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout }),
    [user, login, signup, logout]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
