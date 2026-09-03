import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--spacing-2xl) var(--spacing-md)' }}>
      <h1 style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1, marginBottom: '16px' }}>
        404
      </h1>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-main)' }}>
        Không tìm thấy trang yêu cầu
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '440px', marginBottom: '24px', fontSize: 'var(--font-size-base)' }}>
        Địa chỉ trang web bạn đang truy cập có thể đã bị thay đổi hoặc không tồn tại trên hệ thống Long Xuyên Food.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Trở về Trang chủ
        </Button>
      </Link>
    </div>
  );
};
