import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-brand-title">
              <span>Long Xuyên Food</span>
            </div>
            <p className="footer-brand-desc">
              Cộng đồng khám phá, đánh giá và quảng bá ẩm thực đặc sắc hàng đầu tại Thành phố Long Xuyên, Tỉnh An Giang.
            </p>
          </div>

          {/* Column 1: Discovery */}
          <div className="footer-column">
            <h3 className="footer-column-title">Khám phá</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Trang chủ</Link></li>
              <li><Link to="/restaurants" className="footer-link">Quán ăn nổi bật</Link></li>
              <li><Link to="/restaurants?category=com-tam" className="footer-link">Cơm tấm Long Xuyên</Link></li>
              <li><Link to="/restaurants?category=bun-ca" className="footer-link">Bún cá An Giang</Link></li>
              <li><Link to="/restaurants/submit" className="footer-link">Đề xuất quán mới</Link></li>
            </ul>
          </div>

          {/* Column 2: Business & Owners */}
          <div className="footer-column">
            <h3 className="footer-column-title">Dành cho chủ quán</h3>
            <ul className="footer-links">
              <li><Link to="/business" className="footer-link">Trung tâm chủ quán</Link></li>
              <li><Link to="/pricing" className="footer-link">Bảng giá gói đối tác B2B</Link></li>
              <li><Link to="/restaurants" className="footer-link">Xác nhận quyền sở hữu (Claim)</Link></li>
              <li><Link to="/contact" className="footer-link">Hợp tác truyền thông</Link></li>
            </ul>
          </div>

          {/* Column 3: About & Legal */}
          <div className="footer-column">
            <h3 className="footer-column-title">Về chúng tôi</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">Giới thiệu dự án</Link></li>
              <li><Link to="/contact" className="footer-link">Liên hệ & Góp ý</Link></li>
              <li><Link to="/about#privacy" className="footer-link">Chính sách bảo mật</Link></li>
              <li><Link to="/about#terms" className="footer-link">Điều khoản sử dụng</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Long Xuyên Food. Bản quyền thuộc về đội ngũ phát triển TP. Long Xuyên, An Giang.</p>
          <p>Phiên bản Web 1.0.0 • Xây dựng chuẩn Responsive Web Application</p>
        </div>
      </div>
    </footer>
  );
};
