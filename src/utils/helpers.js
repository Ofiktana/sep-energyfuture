import { ENERGY_SOURCES } from '../data/constants';

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateCards() {
  const sources = shuffleArray([...ENERGY_SOURCES]).slice(0, 8);
  const deck = [...sources, ...sources];
  return shuffleArray(deck).map((src, i) => ({
    id: i,
    sourceId: src.id,
    name: src.name,
    emoji: src.emoji,
    imageUrl: src.imageUrl,
    isFlipped: false,
    isMatched: false,
  }));
}

export function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

export function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function calculateScore(moves, time) {
  return Math.round(Math.max(0, 10000 - moves * 100 - time * 10));
}
