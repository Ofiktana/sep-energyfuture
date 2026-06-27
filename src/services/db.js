import { DEFAULT_USERS, DEFAULT_SCORES } from '../data/constants';

const DB_KEY = 'energy_match_db';

function createInitialDB() {
  return {
    users: DEFAULT_USERS,
    seasons: { current: 'Season 1' },
    scores: DEFAULT_SCORES,
  };
}

export function getDB() {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    const initial = createInitialDB();
    localStorage.setItem(DB_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(stored);
  } catch {
    const initial = createInitialDB();
    localStorage.setItem(DB_KEY, JSON.stringify(initial));
    return initial;
  }
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function getCurrentSeason() {
  return getDB().seasons.current;
}

export function updateSeason(seasonName) {
  const db = getDB();
  db.seasons.current = seasonName;
  saveDB(db);
  return db;
}

export function saveScore(scoreEntry) {
  const db = getDB();
  db.scores.push(scoreEntry);
  saveDB(db);
  return db;
}

export function addUser(user) {
  const db = getDB();
  db.users.push(user);
  saveDB(db);
  return user;
}

export function findUserByCredentials(fullName, password) {
  const db = getDB();
  return db.users.find(
    (u) => u.fullName.toLowerCase() === fullName.toLowerCase() && u.password === password
  );
}

export function findUserByName(fullName) {
  const db = getDB();
  return db.users.find((u) => u.fullName.toLowerCase() === fullName.toLowerCase());
}

export function updateUser(userId, updates) {
  const db = getDB();
  const index = db.users.findIndex((u) => u.id === userId);
  if (index === -1) return db;
  db.users[index] = { ...db.users[index], ...updates };
  saveDB(db);
  return db;
}

export function deleteUser(userId) {
  const db = getDB();
  db.users = db.users.filter((u) => u.id !== userId);
  db.scores = db.scores.filter((s) => s.userId !== userId);
  saveDB(db);
  return db;
}

export function getLeaderboardEntries(season) {
  const db = getDB();
  return db.scores
    .filter((s) => s.season === season)
    .sort((a, b) => b.score - a.score);
}

export function getAllUsers() {
  return getDB().users;
}
