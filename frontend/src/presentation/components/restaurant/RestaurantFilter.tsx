import React from 'react';
import type { Category } from '../../../domain/restaurant/types';
import { Button } from '../common/Button/Button';
import { StarIcon } from '../common/Icons';
import './RestaurantFilter.css';

export interface RestaurantFilterValues {
  categoryId?: number;
  rating?: number;
  isOpen?: boolean;
  sortBy?: 'rating' | 'popular' | 'newest' | 'reviews';
}

export interface RestaurantFilterProps {
  categories: Category[];
  values: RestaurantFilterValues;
  onChange: (newValues: RestaurantFilterValues) => void;
  onReset: () => void;
  className?: string;
}

export const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  categories,
  values,
  onChange,
  onReset,
  className = '',
}) => {
  return (
    <div className={`filter-panel ${className}`}>
      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Danh mục món ăn</h4>
        <div className="filter-category-list">
          {categories.map((cat) => {
            const isActive = (values.categoryId === cat.id) || (!values.categoryId && cat.id === 1);
            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-category-btn ${isActive ? 'active' : ''}`}
                onClick={() => onChange({ ...values, categoryId: cat.id === 1 ? undefined : cat.id })}
              >
                <span>{cat.icon ? `${cat.icon} ` : ''}{cat.name}</span>
                {cat.restaurant_count && <span>({cat.restaurant_count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Đánh giá tối thiểu</h4>
        <div className="filter-rating-options">
          {[
            { val: 0, label: 'Tất cả đánh giá' },
            { val: 4.5, label: 'Từ 4.5 sao trở lên' },
            { val: 4.0, label: 'Từ 4.0 sao trở lên' },
            { val: 3.5, label: 'Từ 3.5 sao trở lên' },
          ].map((item) => (
            <label key={item.val} className="filter-radio-label">
              <input
                type="radio"
                name="rating_filter"
                checked={(values.rating || 0) === item.val}
                onChange={() => onChange({ ...values, rating: item.val || undefined })}
              />
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item.val > 0 && <StarIcon size={16} filled color="var(--color-star)" />}
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Trạng thái quán</h4>
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={!!values.isOpen}
            onChange={(e) => onChange({ ...values, isOpen: e.target.checked || undefined })}
          />
          <span>Chỉ xem quán đang mở cửa</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="filter-actions">
        <Button variant="outline" size="sm" onClick={onReset} fullWidth>
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  );
};
