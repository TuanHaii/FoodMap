import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../components/common/Input/Input';
import { Button } from '../components/common/Button/Button';
import { UserIcon } from '../components/common/Icons';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch {
      setError('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>
        Đăng nhập
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '24px' }}>
        Chào mừng bạn quay lại với Long Xuyên Food
      </p>

      {error && (
        <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger-text)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: 'var(--font-size-sm)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Địa chỉ Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: 'var(--font-size-sm)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <a href="#forgot" style={{ fontSize: 'var(--font-size-xs)' }}>Quên mật khẩu?</a>
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading} leftIcon={<UserIcon size={18} />}>
          Đăng nhập ngay
        </Button>
      </form>

      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        Chưa có tài khoản?{' '}
        <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Đăng ký thành viên
        </Link>
      </div>
    </div>
  );
};
