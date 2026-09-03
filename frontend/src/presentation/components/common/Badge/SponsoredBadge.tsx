import React from 'react';
import { Badge } from './Badge';
import { SparklesIcon } from '../Icons';

export interface SponsoredBadgeProps {
  label?: string;
  className?: string;
}

/**
 * Dedicated Sponsored Badge meeting Requirement #14:
 * Clearly distinguishable from organic results, rating, or verified badges.
 */
export const SponsoredBadge: React.FC<SponsoredBadgeProps> = ({
  label = 'Được tài trợ',
  className = '',
}) => {
  return (
    <Badge
      variant="sponsored"
      icon={<SparklesIcon size={12} color="var(--color-sponsored-text)" />}
      className={`sponsored-badge ${className}`}
    >
      {label}
    </Badge>
  );
};
