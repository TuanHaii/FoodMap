import React from 'react';
import type { Restaurant } from '../../../domain/restaurant/types';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantCardSkeleton } from '../common/Skeleton/Skeleton';
import './RestaurantGrid.css';

export interface RestaurantGridProps {
  restaurants?: Restaurant[];
  isLoading?: boolean;
  skeletonCount?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants = [],
  isLoading = false,
  skeletonCount = 6,
  columns = 3,
  className = '',
}) => {
  const colClass = `restaurant-grid-${columns}-cols`;

  if (isLoading) {
    return (
      <div className={`restaurant-grid ${colClass} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`restaurant-grid ${colClass} ${className}`}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
