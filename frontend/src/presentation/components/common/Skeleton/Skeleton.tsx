import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style,
}) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
    />
  );
};

export const RestaurantCardSkeleton: React.FC = () => (
  <div className="skeleton-card" aria-hidden="true">
    <div className="skeleton skeleton-card-img" />
    <div className="skeleton-card-body">
      <Skeleton width="40%" height="16px" />
      <Skeleton width="80%" height="22px" />
      <Skeleton width="60%" height="16px" />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <Skeleton width="30%" height="18px" />
        <Skeleton width="25%" height="18px" />
      </div>
    </div>
  </div>
);
