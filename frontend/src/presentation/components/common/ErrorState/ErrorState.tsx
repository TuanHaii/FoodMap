import React from 'react';
import { AlertCircleIcon, RefreshIcon } from '../Icons';
import { Button } from '../Button/Button';
import '../EmptyState/EmptyState.css';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Đã có lỗi xảy ra',
  description = 'Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`state-container ${className}`} role="alert">
      <div className="state-icon-wrapper" style={{ color: 'var(--color-danger)' }} aria-hidden="true">
        <AlertCircleIcon size={32} color="var(--color-danger)" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{description}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} leftIcon={<RefreshIcon size={16} />}>
          Thử lại
        </Button>
      )}
    </div>
  );
};
