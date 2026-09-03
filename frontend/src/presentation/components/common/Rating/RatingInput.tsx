import React, { useState } from 'react';
import { StarIcon } from '../Icons';
import './Rating.css';

export interface RatingInputProps {
  label?: string;
  value: number;
  onChange: (val: number) => void;
  error?: string;
  required?: boolean;
}

const RATING_LABELS: Record<number, string> = {
  1: '1 sao - Rất tệ',
  2: '2 sao - Tạm được',
  3: '3 sao - Bình thường',
  4: '4 sao - Ngon / Tốt',
  5: '5 sao - Tuyệt vời, rất hài lòng!',
};

export const RatingInput: React.FC<RatingInputProps> = ({
  label = 'Đánh giá của bạn',
  value,
  onChange,
  error,
  required,
}) => {
  const [hoverValue, setHoverValue] = useState<number>(0);
  const activeValue = hoverValue || value;

  return (
    <div className="rating-input-group">
      {label && (
        <span className="form-label">
          {label}
          {required && <span className="form-label-required" aria-hidden="true">*</span>}
        </span>
      )}
      <div className="rating-input-stars" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="rating-star-btn"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            aria-label={`${star} sao`}
            aria-checked={value === star}
            role="radio"
          >
            <StarIcon
              size={28}
              filled={star <= activeValue}
              color={star <= activeValue ? 'var(--color-star)' : 'var(--color-border)'}
            />
          </button>
        ))}
      </div>
      <div className="rating-hint-text">
        {activeValue > 0 ? RATING_LABELS[activeValue] : 'Chọn số sao để đánh giá'}
      </div>
      {error && <p className="form-error-msg">{error}</p>}
    </div>
  );
};
