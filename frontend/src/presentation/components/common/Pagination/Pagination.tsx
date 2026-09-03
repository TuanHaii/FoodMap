import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={`pagination-container ${className}`} aria-label="Phân trang">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Trang trước"
      >
        <ChevronLeftIcon size={18} />
        <span className="pagination-text">Trước</span>
      </button>

      <div className="pagination-pages">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`pagination-page-number ${p === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Trang sau"
      >
        <span className="pagination-text">Sau</span>
        <ChevronRightIcon size={18} />
      </button>
    </nav>
  );
};
