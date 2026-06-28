import { useCallback, useEffect, useRef, useState } from 'react';
import { saveScore } from '../services/scoresService';
import { getCurrentSeason } from '../services/seasonService';
import { calculateScore, formatTime, generateCards } from '../utils/helpers';
import MemoryCard from './MemoryCard';
import VictoryBanner from './VictoryBanner';

export default function GameTab({ user, onScoreSaved }) {
  const [cards, setCards] = useState(() => generateCards());
  const [flipped, setFlipped] = useState([]);
  const [mismatchIndices, setMismatchIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [victorySeason, setVictorySeason] = useState('');
  const timerRef = useRef(null);
  const cardsRef = useRef(cards);
  const flippedRef = useRef(flipped);
  const movesRef = useRef(moves);
  const timeRef = useRef(time);

  cardsRef.current = cards;
  flippedRef.current = flipped;
  movesRef.current = moves;
  timeRef.current = time;

  const matchedPairs = cards.filter((c) => c.isMatched).length / 2;
  const totalPairs = cards.length / 2;
  const liveScore = calculateScore(moves, time);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }, [clearTimer]);

  const resetGame = useCallback(() => {
    clearTimer();
    setCards(generateCards());
    setFlipped([]);
    setMismatchIndices([]);
    setMoves(0);
    setTime(0);
    setIsLocked(false);
    setIsGameOver(false);
    setScore(0);
    setVictorySeason('');
    startTimer();
  }, [clearTimer, startTimer]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const handleVictory = useCallback(
    async (finalMoves, finalTime) => {
      const finalScore = calculateScore(finalMoves, finalTime);
      setScore(finalScore);
      setIsGameOver(true);
      clearTimer();

      try {
        const season = await getCurrentSeason();
        setVictorySeason(season);
        await saveScore({
          userId: user.id,
          fullName: user.fullName,
          affiliation: user.affiliation,
          role: user.role,
          score: finalScore,
          moves: finalMoves,
          time: finalTime,
          season,
        });
        onScoreSaved?.();
      } catch (err) {
        console.error('Failed to save score:', err);
      }
    },
    [user, clearTimer, onScoreSaved]
  );

  const handleCardClick = useCallback(
    (index) => {
      if (isLocked || isGameOver) return;

      const card = cardsRef.current[index];
      if (!card || card.isFlipped || card.isMatched) return;
      if (flippedRef.current.length >= 2) return;

      const updatedCards = cardsRef.current.map((c, i) =>
        i === index ? { ...c, isFlipped: true } : c
      );
      const nextFlipped = [...flippedRef.current, index];

      setCards(updatedCards);
      setFlipped(nextFlipped);

      if (nextFlipped.length === 2) {
        const nextMoves = movesRef.current + 1;
        setMoves(nextMoves);

        const [i1, i2] = nextFlipped;
        const isMatch = updatedCards[i1].sourceId === updatedCards[i2].sourceId;

        if (isMatch) {
          const matchedCards = updatedCards.map((c, i) =>
            i === i1 || i === i2 ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setFlipped([]);

          if (matchedCards.every((c) => c.isMatched)) {
            handleVictory(nextMoves, timeRef.current);
          }
        } else {
          setIsLocked(true);
          setMismatchIndices([i1, i2]);

          setTimeout(() => {
            setCards((current) =>
              current.map((c, i) =>
                i === i1 || i === i2 ? { ...c, isFlipped: false } : c
              )
            );
            setFlipped([]);
            setMismatchIndices([]);
            setIsLocked(false);
          }, 900);
        }
      }
    },
    [isLocked, isGameOver, handleVictory]
  );

  return (
    <>
      <div className="hud">
        <div className="hud-stats">
          <div className="hud-stat">
            <span className="hud-stat-label">Time</span>
            <span className="hud-stat-val lemon">{formatTime(time)}</span>
          </div>
          <div className="hud-sep" />
          <div className="hud-stat">
            <span className="hud-stat-label">Moves</span>
            <span className="hud-stat-val">{moves}</span>
          </div>
          <div className="hud-sep" />
          <div className="hud-stat">
            <span className="hud-stat-label">Pairs</span>
            <span className="hud-stat-val green">
              {matchedPairs}/{totalPairs}
            </span>
          </div>
          <div className="hud-sep" />
          <div className="hud-stat">
            <span className="hud-stat-label">Score</span>
            <span className="hud-stat-val lemon">{liveScore.toLocaleString()}</span>
          </div>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={resetGame}>
          ↺ New Game
        </button>
      </div>

      <div className="game-grid">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            card={card}
            index={index}
            isMismatch={mismatchIndices.includes(index)}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {isGameOver && (
        <VictoryBanner
          moves={moves}
          time={time}
          score={score}
          season={victorySeason}
        />
      )}
    </>
  );
}
