import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Drawer } from '../common/Drawer/Drawer';
import { Button } from '../common/Button/Button';
import {
  MenuIcon,
  SearchIcon,
  UserIcon,
  LogOutIcon,
  BuildingIcon,
  PlusIcon,
  ChevronRightIcon
} from '../common/Icons';
import './Header.css';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Top Row */}
        <div className="header-top-row">
          {/* Logo */}
          <Link to="/" className="brand-logo" aria-label="Long Xuyên Food Trang chủ">
            <div className="brand-icon" aria-hidden="true">
              LX
            </div>
            <div className="brand-text">
              <span className="brand-title">Long Xuyên Food</span>
              <span className="brand-subtitle">KHÁM PHÁ ẨM THỰC AN GIANG</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Menu chính">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Trang chủ
            </NavLink>
            <NavLink to="/restaurants" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Khám phá
            </NavLink>
            <NavLink to="/restaurants/submit" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Đề xuất quán
            </NavLink>
            <NavLink to="/business" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dành cho chủ quán
            </NavLink>
          </nav>

          {/* Desktop Search */}
          <form className="header-search-form desktop-only" onSubmit={handleSearchSubmit}>
            <SearchIcon size={18} className="header-search-icon" />
            <input
              type="search"
              className="header-search-input"
              placeholder="Tìm quán ăn, món ngon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm quán ăn hoặc món ăn"
            />
          </form>

          {/* Desktop Auth Section */}
          <div className="header-actions">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/profile" className="user-profile-btn" aria-label="Trang cá nhân">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} className="user-avatar-img" />
                  ) : (
                    <UserIcon size={18} />
                  )}
                  <span>{user?.name}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()} aria-label="Đăng xuất">
                  <LogOutIcon size={18} />
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login">
                  <Button variant="outline" size="sm">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Đăng ký</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="mobile-controls">
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Mở menu điều hướng"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Row (Always visible beneath logo on mobile screens) */}
        <div className="mobile-search-row">
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <SearchIcon size={18} className="header-search-icon" />
            <input
              type="search"
              className="header-search-input"
              placeholder="Tìm quán ăn, món ngon Long Xuyên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm quán ăn trên di động"
            />
          </form>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Danh mục website"
        position="right"
      >
        <div className="mobile-menu-content">
          <nav className="mobile-nav-links" aria-label="Menu di động">
            <NavLink
              to="/"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              end
            >
              <span>Trang chủ</span>
              <ChevronRightIcon size={18} />
            </NavLink>
            <NavLink
              to="/restaurants"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Khám phá ẩm thực</span>
              <ChevronRightIcon size={18} />
            </NavLink>
            <NavLink
              to="/restaurants/submit"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlusIcon size={18} color="var(--color-primary)" />
                Đề xuất quán mới
              </span>
              <ChevronRightIcon size={18} />
            </NavLink>
            <NavLink
              to="/business"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BuildingIcon size={18} color="var(--color-primary)" />
                Dành cho chủ quán
              </span>
              <ChevronRightIcon size={18} />
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Bảng giá dịch vụ B2B</span>
              <ChevronRightIcon size={18} />
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Giới thiệu về chúng tôi</span>
              <ChevronRightIcon size={18} />
            </NavLink>
          </nav>

          <div className="mobile-auth-section">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth leftIcon={<UserIcon size={18} />}>
                    Tài khoản: {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  leftIcon={<LogOutIcon size={18} />}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>Đăng nhập</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>Đăng ký thành viên</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};
