import React from 'react';
import { SearchIcon } from '../Icons';
import { Button } from '../Button/Button';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <SearchIcon size={32} />,
  title = 'Không tìm thấy kết quả',
  description = 'Rất tiếc, chúng tôi không tìm thấy quán ăn hoặc món ăn phù hợp với tiêu chí của bạn.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`state-container ${className}`}>
      <div className="state-icon-wrapper" aria-hidden="true">
        {icon}
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
