import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../Icons';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-nav ${className}`}>
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="breadcrumb-item">
              {item.href && !isLast ? (
                <Link to={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRightIcon size={14} className="breadcrumb-separator" color="var(--color-text-muted)" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
