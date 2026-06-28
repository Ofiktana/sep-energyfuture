import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  createUser,
  findUserByUsernameAndPassword,
  toSessionUser,
} from '../services/usersService';

const SESSION_KEY = 'energy_user';

const AppContext = createContext(null);

function loadSessionUser() {
  const saved = sessionStorage.getItem(SESSION_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadSessionUser());

  const login = useCallback(async (username, password) => {
    const found = await findUserByUsernameAndPassword(username, password);
    if (!found) {
      throw new Error('Invalid credentials. Please check your username and password.');
    }

    const sessionUser = toSessionUser(found);
    setUser(sessionUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  }, []);

  const signup = useCallback(async ({ fullName, username, affiliation, role, password }) => {
    const newUser = await createUser({ fullName, username, affiliation, role, password });
    const sessionUser = toSessionUser(newUser);
    setUser(sessionUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
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
