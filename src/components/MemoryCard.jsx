import { useState } from 'react';
import CircuitSVG from './CircuitSVG';

export default function MemoryCard({ card, index, isMismatch, onClick }) {
  const [imageFailed, setImageFailed] = useState(false);

  const classNames = [
    'card',
    card.isFlipped || card.isMatched ? 'flipped' : '',
    card.isMatched ? 'matched' : '',
    isMismatch ? 'mismatch' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}  onClick={() => onClick(index)}>
      <div className="card-inner">
        <div className="card-face card-back">
          <CircuitSVG />
          <span className="card-back-icon">⚡</span>
        </div>
        <div className="card-face card-front">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              gap: '4px',
            }}
          >
            {!imageFailed && (
              <img
                src={card.imageUrl}
                alt={card.name}
                loading="lazy"
                style={{ maxWidth: '55%', maxHeight: '55%', objectFit: 'contain' }}
                onError={() => setImageFailed(true)}
              />
            )}
            {imageFailed && <span className="emoji-fallback">{card.emoji}</span>}
            <span className="card-caption">{card.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
