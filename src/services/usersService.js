import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { deleteScoresByUserId } from './scoresService';

const USERS_COLLECTION = 'Users';

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

export async function fetchAllUsers() {
  const snapshot = await getDocs(collection(db, USERS_COLLECTION));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function findUserByUsernameAndPassword(username, password) {
  const normalized = normalizeUsername(username);
  const userRef = doc(db, USERS_COLLECTION, normalized);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  const user = { id: snapshot.id, ...snapshot.data() };
  return user.password === password ? user : null;
}

export async function usernameExists(username) {
  const normalized = normalizeUsername(username);
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, normalized));
  return snapshot.exists();
}

export async function createUser({ fullName, username, affiliation, role, password }) {
  const normalizedUsername = normalizeUsername(username);
  const userRef = doc(db, USERS_COLLECTION, normalizedUsername);

  const userData = {
    fullName: fullName.trim(),
    username: normalizedUsername,
    affiliation: affiliation.trim(),
    role: role.trim(),
    password,
    isAdmin: false,
    createdAt: new Date().toISOString(),
  };

  await runTransaction(db, async (transaction) => {
    const existing = await transaction.get(userRef);
    if (existing.exists()) {
      throw new Error('That username is already taken. Please choose another or log in.');
    }
    transaction.set(userRef, userData);
  });

  return { id: normalizedUsername, ...userData };
}

export async function updateUser(userId, updates) {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    fullName: updates.fullName.trim(),
    affiliation: updates.affiliation.trim(),
    role: updates.role.trim(),
  });
}

export async function deleteUser(userId) {
  await deleteScoresByUserId(userId);
  await deleteDoc(doc(db, USERS_COLLECTION, userId));
}

export function toSessionUser(user) {
  const { password: _password, ...sessionUser } = user;
  return sessionUser;
}
