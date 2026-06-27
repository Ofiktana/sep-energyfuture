import { formatTime } from '../utils/helpers';

export default function VictoryBanner({ moves, time, score, season }) {
  return (
    <div className="victory-banner">
      <span className="victory-icon">🏆</span>
      <div className="victory-title">Mission Complete!</div>
      <div className="victory-meta">
        <strong>{moves}</strong> moves &nbsp;·&nbsp; <strong>{formatTime(time)}</strong>
      </div>
      <div className="victory-score-num">{score.toLocaleString()}</div>
      <div className="victory-score-label">Final Score ·  {season}</div>
      <div className="victory-saved">✓ Score saved to leaderboard</div>
    </div>
  );
}
