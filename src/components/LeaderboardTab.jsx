import { useEffect, useState } from 'react';
import { getLeaderboardEntries } from '../services/scoresService';
import { getCurrentSeason } from '../services/seasonService';
import { formatTime } from '../utils/helpers';

function rankLabel(index) {
  const cls = index === 0 ? 'r1' : index === 1 ? 'r2' : index === 2 ? 'r3' : '';
  const lbl =
    index === 0 ? '👑 1' : index === 1 ? '🥈 2' : index === 2 ? '🥉 3' : `#${index + 1}`;
  return <span className={`lb-rank ${cls}`}>{lbl}</span>;
}

export default function LeaderboardTab({ refreshKey }) {
  const [currentSeason, setCurrentSeason] = useState('');
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadLeaderboard() {
      setIsLoading(true);
      setError('');
      try {
        const season = await getCurrentSeason();
        const scores = await getLeaderboardEntries(season);
        if (!cancelled) {
          setCurrentSeason(season);
          setEntries(scores);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <>
      <div className="lb-header">🏆 Leaderboard</div>
      <div className="lb-sub">
        Season: <strong style={{ color: 'var(--lemon)' }}>{currentSeason || '…'}</strong> · Top{' '}
        {Math.min(entries.length, 20)} champions
      </div>

      {isLoading ? (
        <div className="lb-empty">Loading leaderboard…</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : entries.length === 0 ? (
        <div className="lb-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌱</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>No scores for this season</div>
          <div style={{ fontSize: '0.84rem' }}>Play a game to appear on the leaderboard!</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Affiliation</th>
                <th>Role</th>
                <th>Score</th>
                <th>Moves</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.slice(0, 20).map((entry, index) => (
                <tr key={entry.id}>
                  <td>{rankLabel(index)}</td>
                  <td className="lb-name">{entry.fullName}</td>
                  <td className="lb-affil">{entry.affiliation}</td>
                  <td className="lb-role">{entry.role}</td>
                  <td className="lb-score">{entry.score.toLocaleString()}</td>
                  <td className="lb-meta">{entry.moves}</td>
                  <td className="lb-meta">{formatTime(entry.time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
