import React, { useEffect, type PropsWithChildren } from 'react';
import { CloseIcon } from '../Icons';
import './Drawer.css';

export interface DrawerProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
  footer,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className={`drawer-container drawer-${position} ${isOpen ? 'drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Menu'}
      >
        <div className="drawer-header">
          {title ? <h2 className="drawer-title">{title}</h2> : <div />}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <CloseIcon size={22} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </>
  );
};
