import React from 'react';
import { Badge } from './Badge';
import { ShieldCheckIcon } from '../Icons';

export interface VerifiedBadgeProps {
  label?: string;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  label = 'Đã xác minh',
  className = '',
}) => {
  return (
    <Badge
      variant="verified"
      icon={<ShieldCheckIcon size={13} color="var(--color-verified-text)" />}
      className={`verified-badge ${className}`}
    >
      {label}
    </Badge>
  );
};
