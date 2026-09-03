import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb/Breadcrumb';
import { Input } from '../components/common/Input/Input';
import { Textarea } from '../components/common/Textarea/Textarea';
import { Button } from '../components/common/Button/Button';
import { CheckCircleIcon, MapPinIcon, PhoneIcon } from '../components/common/Icons';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSent(true);
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-lg) 0 var(--spacing-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Liên hệ & Hợp tác' },
          ]}
        />

        <div style={{ backgroundColor: 'var(--color-bg-card)', padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
            Liên hệ ban quản trị
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            Mọi thông tin liên hệ hỗ trợ kỹ thuật, hợp tác truyền thông quảng bá quán ăn hoặc góp ý tính năng.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px', padding: '16px', backgroundColor: 'var(--color-bg-page)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPinIcon size={20} color="var(--color-primary)" />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>TP. Long Xuyên, Tỉnh An Giang</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneIcon size={20} color="var(--color-primary)" />
              <span style={{ fontSize: 'var(--font-size-sm)' }}>Hotline: 0296 3841 999</span>
            </div>
          </div>

          {isSent ? (
            <div style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success-text)', borderRadius: 'var(--radius-lg)' }}>
              <CheckCircleIcon size={40} />
              <h3 style={{ fontSize: 'var(--font-size-lg)', marginTop: '8px', marginBottom: '4px' }}>Cảm ơn bạn đã liên hệ!</h3>
              <p style={{ fontSize: 'var(--font-size-sm)' }}>Đội ngũ Long Xuyên Food sẽ phản hồi qua email {email} trong thời gian sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <Input
                  label="Họ và tên của bạn"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email nhận phản hồi"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Textarea
                label="Nội dung tin nhắn / Đề xuất hợp tác"
                placeholder="Nhập chi tiết yêu cầu của bạn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <Button type="submit" variant="primary">
                  Gửi tin nhắn
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
