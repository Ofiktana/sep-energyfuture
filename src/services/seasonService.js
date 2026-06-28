import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const SEASON_COLLECTION = 'season';
const SEASON_DOC_ID = 'current';
const DEFAULT_SEASON = 'Season 1';

export async function getCurrentSeason() {
  const seasonRef = doc(db, SEASON_COLLECTION, SEASON_DOC_ID);
  const snapshot = await getDoc(seasonRef);

  if (!snapshot.exists()) {
    await setDoc(seasonRef, { title: DEFAULT_SEASON });
    return DEFAULT_SEASON;
  }

  return snapshot.data().title ?? DEFAULT_SEASON;
}

export async function updateSeason(title) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error('Season title cannot be empty.');
  }

  const seasonRef = doc(db, SEASON_COLLECTION, SEASON_DOC_ID);
  await setDoc(seasonRef, { title: trimmed }, { merge: true });
  return trimmed;
}
