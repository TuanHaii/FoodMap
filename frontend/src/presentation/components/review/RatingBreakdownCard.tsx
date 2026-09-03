import React from 'react';
import type { RatingBreakdown } from '../../../domain/review/types';
import { RatingDisplay } from '../common/Rating/RatingDisplay';
import { StarIcon } from '../common/Icons';
import './RatingBreakdownCard.css';

export interface RatingBreakdownCardProps {
  breakdown: RatingBreakdown;
  horizontal?: boolean;
}

export const RatingBreakdownCard: React.FC<RatingBreakdownCardProps> = ({
  breakdown,
  horizontal = true,
}) => {
  const total = breakdown.total_count || 1;

  return (
    <div className={`breakdown-card ${horizontal ? 'breakdown-card-horizontal' : ''}`}>
      <div className="breakdown-summary">
        <div className="breakdown-score">{breakdown.average.toFixed(1)}</div>
        <RatingDisplay score={breakdown.average} showScore={false} size={20} />
        <span className="breakdown-total">Dựa trên {breakdown.total_count} đánh giá</span>
      </div>

      <div className="breakdown-bars">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = breakdown.distribution[star] || 0;
          const percentage = Math.round((count / total) * 100);

          return (
            <div key={star} className="breakdown-row">
              <div className="breakdown-row-label">
                <span>{star}</span>
                <StarIcon size={12} filled color="var(--color-star)" />
              </div>
              <div className="breakdown-progress-track">
                <div
                  className="breakdown-progress-fill"
                  style={{ width: `${percentage}%` }}
                  aria-label={`${percentage}%`}
                />
              </div>
              <span className="breakdown-row-count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
