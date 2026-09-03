import React from 'react';
import type { Dish } from '../../../domain/restaurant/types';
import { Badge } from '../common/Badge/Badge';
import { SparklesIcon } from '../common/Icons';
import './DishCard.css';

export interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const formattedPrice = dish.price.toLocaleString('vi-VN') + 'đ';

  return (
    <div className="dish-card">
      <div className="dish-card-info">
        <div className="dish-card-header">
          <h4 className="dish-name">{dish.name}</h4>
          {dish.is_signature && (
            <Badge variant="primary" icon={<SparklesIcon size={12} />}>
              Món đặc trưng
            </Badge>
          )}
        </div>
        {dish.description && <p className="dish-description">{dish.description}</p>}
        <span className="dish-price">{formattedPrice}</span>
      </div>
      {dish.image_url && (
        <img src={dish.image_url} alt={dish.name} className="dish-image" loading="lazy" />
      )}
    </div>
  );
};
