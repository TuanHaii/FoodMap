import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <div className="brand-icon">LX</div>
          <span className="brand-title">Long Xuyên Food</span>
        </Link>
      </header>
      <main className="auth-content">
        <div className="auth-card">
          <Outlet />
        </div>
      </main>
      <footer className="auth-footer">
        <p>© {new Date().getFullYear()} Long Xuyên Food • Nền tảng ẩm thực An Giang</p>
      </footer>
    </div>
  );
};
