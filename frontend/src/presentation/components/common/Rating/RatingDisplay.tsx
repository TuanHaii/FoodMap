import React from 'react';
import { StarIcon } from '../Icons';
import './Rating.css';

export interface RatingDisplayProps {
  score: number;
  reviewCount?: number;
  showStars?: boolean;
  showScore?: boolean;
  size?: number;
  className?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  score,
  reviewCount,
  showStars = true,
  showScore = true,
  size = 15,
  className = '',
}) => {
  const roundedScore = Math.round(score * 10) / 10;
  const fullStars = Math.floor(score);

  return (
    <div className={`rating-display ${className}`}>
      {showStars && (
        <div className="rating-stars" aria-label={`Đánh giá ${roundedScore} trên 5 sao`}>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              size={size}
              filled={index <= fullStars}
              color={index <= fullStars ? 'var(--color-star)' : 'var(--color-border)'}
            />
          ))}
        </div>
      )}
      {showScore && <span className="rating-score">{roundedScore.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="rating-count">({reviewCount} đánh giá)</span>
      )}
    </div>
  );
};
