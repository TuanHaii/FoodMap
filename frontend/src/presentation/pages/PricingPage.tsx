import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb/Breadcrumb';
import { Button } from '../components/common/Button/Button';
import { CheckIcon, SparklesIcon, ShieldCheckIcon } from '../components/common/Icons';
import { businessService } from '../../services/businessService';
import type { SubscriptionPlan } from '../../domain/subscription/types';
import './PricingPage.css';

export const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    businessService.getSubscriptionPlans().then(setPlans);
  }, []);

  return (
    <div className="pricing-page">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Bảng giá dịch vụ đối tác quán ăn' },
          ]}
        />

        <header className="pricing-header">
          <h1 className="pricing-title">Gói Giải Pháp Phát Triển Cho Quán Ăn Long Xuyên</h1>
          <p className="pricing-subtitle">
            Gia tăng độ nhận diện thương hiệu, tiếp cận hàng chục ngàn khách hàng tiềm năng và tối ưu hóa doanh thu quán ăn của bạn.
          </p>

          {/* Critical Requirement #14 Trust callout */}
          <div className="pricing-trust-callout">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
              <ShieldCheckIcon size={18} />
              <span>Cam kết minh bạch và uy tín</span>
            </div>
            Gói dịch vụ tài trợ giúp quán hiển thị nổi bật với huy hiệu &quot;Được tài trợ&quot; minh bạch. Chúng tôi <strong>không bao giờ</strong> bán điểm số hoặc can thiệp vào nhận xét chân thực của thực khách.
          </div>

          {/* Billing Cycle Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                backgroundColor: billingCycle === 'monthly' ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: billingCycle === 'monthly' ? '#ffffff' : 'var(--color-text-body)',
                border: '1px solid var(--color-border)',
              }}
            >
              Thanh toán Hàng tháng
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                backgroundColor: billingCycle === 'yearly' ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: billingCycle === 'yearly' ? '#ffffff' : 'var(--color-text-body)',
                border: '1px solid var(--color-border)',
              }}
            >
              Thanh toán Theo năm (Tiết kiệm 20%)
            </button>
          </div>
        </header>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
            const priceFormatted = price === 0 ? 'Miễn phí' : `${price.toLocaleString('vi-VN')}đ`;

            return (
              <div key={plan.id} className={`pricing-card ${plan.is_popular ? 'popular' : ''}`}>
                {plan.is_popular && (
                  <div className="popular-badge">
                    <SparklesIcon size={12} /> Phổ biến nhất
                  </div>
                )}

                <h2 className="pricing-plan-name">{plan.name}</h2>

                <div className="pricing-price-box">
                  <span className="pricing-price-num">{priceFormatted}</span>
                  {price > 0 && (
                    <span className="pricing-price-period">
                      /{billingCycle === 'monthly' ? 'tháng' : 'năm'}
                    </span>
                  )}
                </div>

                <Link to="/business">
                  <Button
                    variant={plan.is_popular ? 'primary' : 'outline'}
                    fullWidth
                    size="md"
                  >
                    {price === 0 ? 'Bắt đầu miễn phí' : 'Đăng ký ngay'}
                  </Button>
                </Link>

                <ul className="pricing-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="pricing-feature-item">
                      <CheckIcon size={18} className="pricing-feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
