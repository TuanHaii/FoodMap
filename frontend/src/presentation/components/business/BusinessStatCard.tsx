import React from 'react';
import './BusinessStatCard.css';

export interface BusinessStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const BusinessStatCard: React.FC<BusinessStatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  );
};
