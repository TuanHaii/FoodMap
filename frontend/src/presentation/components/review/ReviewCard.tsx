import React from 'react';
import type { Review } from '../../../domain/review/types';
import { RatingDisplay } from '../common/Rating/RatingDisplay';
import { UserIcon } from '../common/Icons';
import './ReviewCard.css';

export interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formattedDate = review.created_at
    ? new Date(review.created_at).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="review-card" aria-label={`Đánh giá từ ${review.user.name}`}>
      <div className="review-header">
        <div className="review-user-info">
          {review.user.avatar_url ? (
            <img src={review.user.avatar_url} alt={review.user.name} className="review-avatar" />
          ) : (
            <div className="review-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={20} color="var(--color-text-secondary)" />
            </div>
          )}
          <div>
            <h4 className="review-user-name">{review.user.name}</h4>
            <span className="review-date">{formattedDate}</span>
          </div>
        </div>
        <RatingDisplay score={review.rating} showScore={false} size={16} />
      </div>

      {review.comment && <p className="review-comment">{review.comment}</p>}

      {review.media && review.media.length > 0 && (
        <div className="review-photos-grid">
          {review.media.map((img) => (
            <div key={img.id} className="review-photo-item">
              <img
                src={img.url}
                alt={img.caption || 'Ảnh đánh giá'}
                className="review-photo-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {review.reply && (
        <div className="review-owner-reply">
          <div className="reply-header">
            <span className="reply-author">Phản hồi từ {review.reply.user_name}</span>
            <span className="reply-date">
              {new Date(review.reply.created_at).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <p className="reply-content">{review.reply.comment}</p>
        </div>
      )}
    </article>
  );
};
