import { useMemo } from 'react';
import { getCurrentSeason, getLeaderboardEntries } from '../services/db';
import { formatTime } from '../utils/helpers';

function rankLabel(index) {
  const cls = index === 0 ? 'r1' : index === 1 ? 'r2' : index === 2 ? 'r3' : '';
  const lbl =
    index === 0 ? '👑 1' : index === 1 ? '🥈 2' : index === 2 ? '🥉 3' : `#${index + 1}`;
  return <span className={`lb-rank ${cls}`}>{lbl}</span>;
}

export default function LeaderboardTab({ refreshKey }) {
  const currentSeason = getCurrentSeason();

  const entries = useMemo(
    () => getLeaderboardEntries(currentSeason),
    [currentSeason, refreshKey]
  );

  return (
    <>
      <div className="lb-header">🏆 Leaderboard</div>
      <div className="lb-sub">
        Season: <strong style={{ color: 'var(--lemon)' }}>{currentSeason}</strong> · Top{' '}
        {Math.min(entries.length, 20)} champions
      </div>

      {entries.length === 0 ? (
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

      {/* <div className="formula-note">
        <strong style={{ color: 'rgba(249,224,118,0.7)' }}>Score formula:</strong>{' '}
        <code>max(0, 10,000 − Moves × 100 − Seconds × 10)</code>
        — fewer moves and faster time earns a higher score.
        <span style={{ display: 'block', marginTop: '4px' }}>
          🏷️ Scores are tagged with the active season:{' '}
          <strong style={{ color: 'var(--lemon)' }}>{currentSeason}</strong>
        </span>
      </div> */}
    </>
  );
}
