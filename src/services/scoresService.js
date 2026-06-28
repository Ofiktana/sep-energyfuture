import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const SCORES_COLLECTION = 'Scores';

export async function saveScore(scoreEntry) {
  const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
    ...scoreEntry,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...scoreEntry };
}

export async function getLeaderboardEntries(season) {
  const scoresQuery = query(
    collection(db, SCORES_COLLECTION),
    where('season', '==', season)
  );
  const snapshot = await getDocs(scoresQuery);

  return snapshot.docs
    .map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    .sort((a, b) => b.score - a.score);
}

export async function deleteScoresByUserId(userId) {
  const scoresQuery = query(
    collection(db, SCORES_COLLECTION),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(scoresQuery);

  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
  await batch.commit();
}
