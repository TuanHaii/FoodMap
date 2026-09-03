import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb/Breadcrumb';
import { SparklesIcon, ShieldCheckIcon, MapPinIcon } from '../components/common/Icons';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--spacing-lg) 0 var(--spacing-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Giới thiệu về Long Xuyên Food' },
          ]}
        />

        <article style={{ backgroundColor: 'var(--color-bg-card)', padding: 'var(--spacing-2xl)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
              Về dự án Long Xuyên Food
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              Nền tảng số hóa và quảng bá bản đồ ẩm thực đặc sản Thành phố Long Xuyên, Tỉnh An Giang
            </p>
          </div>

          <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={20} /> Sứ mệnh của chúng tôi
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-body)' }}>
              Long Xuyên Food được thành lập với mục tiêu trở thành cầu nối tin cậy giữa các quán ăn gia truyền, nhà hàng đặc sản địa phương và hàng trăm ngàn thực khách sành ăn cùng du khách thập phương khi ghé thăm vùng đất An Giang thanh bình.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheckIcon size={20} /> Nguyên tắc minh bạch & cộng đồng
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-body)' }}>
              Mọi đánh giá, chấm điểm trên Long Xuyên Food đều được phản ánh từ trải nghiệm ẩm thực thực tế của người dùng. Các nội dung quảng cáo hoặc được tài trợ luôn được dán nhãn &quot;Được tài trợ&quot; rõ ràng để bảo vệ tính công tâm tuyệt đối cho cộng đồng.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPinIcon size={20} /> Phạm vi hoạt động
            </h2>
            <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-body)' }}>
              Bao phủ toàn bộ 11 phường và 2 xã của TP. Long Xuyên: Phường Mỹ Long, Mỹ Bình, Mỹ Phước, Mỹ Quý, Mỹ Thới, Mỹ Thạnh, Mỹ Hòa, Mỹ Xuyên, Bình Khánh, Bình Đức, Đông Xuyên và xã Mỹ Khánh, xã cù lao Mỹ Hòa Hưng.
            </p>
          </section>

          <section id="terms" style={{ paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: '6px' }}>Điều khoản & Bảo mật</h2>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Chúng tôi cam kết tôn trọng quyền riêng tư và bảo mật thông tin tài khoản người dùng theo đúng quy định pháp luật Việt Nam.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};
