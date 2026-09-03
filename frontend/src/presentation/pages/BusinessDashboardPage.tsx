import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb/Breadcrumb';
import { Tabs } from '../components/common/Tabs/Tabs';
import { Button } from '../components/common/Button/Button';
import { Input } from '../components/common/Input/Input';
import { Textarea } from '../components/common/Textarea/Textarea';
import { Modal } from '../components/common/Modal/Modal';
import { BusinessStatCard } from '../components/business/BusinessStatCard';
import { BusinessDataTable } from '../components/business/BusinessDataTable';
import { DishCard } from '../components/restaurant/DishCard';
import { ReviewCard } from '../components/review/ReviewCard';
import { businessService } from '../../services/businessService';
import { restaurantService } from '../../services/restaurantService';
import { reviewService } from '../../services/reviewService';
import type { Restaurant, Dish } from '../../domain/restaurant/types';
import type { Review } from '../../domain/review/types';
import type { BusinessDashboardStats, BusinessInvoice } from '../../domain/subscription/types';
import {
  BuildingIcon,
  PlusIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
} from '../components/common/Icons';
import './BusinessDashboardPage.css';

export const BusinessDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<BusinessDashboardStats | null>(null);
  const [invoices, setInvoices] = useState<BusinessInvoice[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [newDish, setNewDish] = useState<{ name: string; price: string; description: string; isSignature: boolean }>({
    name: '',
    price: '',
    description: '',
    isSignature: false,
  });

  useEffect(() => {
    // Load business analytics
    businessService.getDashboardStats(1).then(setStats);
    businessService.getInvoices().then(setInvoices);
    restaurantService.getRestaurantBySlug('com-tam-cay-diep-long-xuyen').then(setRestaurant);
    reviewService.getReviews('com-tam-cay-diep-long-xuyen').then((res) => setReviews(res.data));
  }, []);

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name.trim() || !newDish.price) return;

    if (restaurant) {
      const added: Dish = {
        id: Date.now(),
        restaurant_id: restaurant.id,
        name: newDish.name,
        price: Number(newDish.price) || 30000,
        description: newDish.description,
        is_signature: newDish.isSignature,
      };

      setRestaurant({
        ...restaurant,
        dishes: [...(restaurant.dishes || []), added],
      });
    }

    setNewDish({ name: '', price: '', description: '', isSignature: false });
    setIsAddDishModalOpen(false);
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Trung tâm Chủ Quán (Business Portal)' },
          ]}
        />

        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              <BuildingIcon size={32} color="var(--color-primary)" />
              {restaurant?.name || 'Quán Cơm Tấm Cây Điệp'}
            </h1>
            <p className="dashboard-subtitle">
              Quản lý thực đơn, theo dõi tương tác thực khách và thống kê doanh thu tại TP. Long Xuyên
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to={`/restaurants/${restaurant?.slug || 1}`}>
              <Button variant="outline" size="sm">Xem trang công khai</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="primary" size="sm" leftIcon={<SparklesIcon size={16} />}>
                Nâng cấp Gói Pro
              </Button>
            </Link>
          </div>
        </div>

        {/* 1. Analytics KPI Cards Row */}
        {stats && (
          <div className="stats-grid">
            <BusinessStatCard
              title="Lượt xem trong tháng"
              value={stats.views_this_month.toLocaleString('vi-VN')}
              change={`${stats.views_growth_percent}% so với tháng trước`}
              isPositive={true}
              icon={<UserIcon size={20} />}
            />
            <BusinessStatCard
              title="Đánh giá trung bình"
              value={`${stats.avg_rating} / 5.0`}
              icon={<StarIcon size={20} filled color="var(--color-star)" />}
            />
            <BusinessStatCard
              title="Tổng lượt đánh giá"
              value={stats.total_reviews}
              change={`+${stats.new_reviews_this_week} tuần này`}
              isPositive={true}
              icon={<SparklesIcon size={20} />}
            />
            <BusinessStatCard
              title="Lượt khách Check-in"
              value={stats.checkins_count.toLocaleString('vi-VN')}
              icon={<BuildingIcon size={20} />}
            />
          </div>
        )}

        {/* 2. Management Navigation Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'menu', label: 'Quản lý Thực đơn', count: restaurant?.dishes?.length || 0 },
            { id: 'reviews', label: 'Đánh giá & Phản hồi', count: reviews.length },
            { id: 'billing', label: 'Hóa đơn & Gói dịch vụ' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* 3. Tab Contents */}
        <div className="dashboard-content-area">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Đánh giá mới nhất từ thực khách</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('reviews')}>
                  Xem tất cả
                </Button>
              </div>
              <div className="reviews-list">
                {reviews.slice(0, 2).map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            </div>
          )}

          {/* Menu Management Tab */}
          {activeTab === 'menu' && (
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <h2 className="dashboard-card-title">Danh sách món ăn & nước uống</h2>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    Cập nhật hình ảnh, giá bán và đánh dấu món đặc trưng (Signature)
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddDishModalOpen(true)}
                  leftIcon={<PlusIcon size={16} />}
                >
                  Thêm món mới
                </Button>
              </div>

              <div className="menu-management-grid">
                {restaurant?.dishes?.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews & Replies Tab */}
          {activeTab === 'reviews' && (
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <h2 className="dashboard-card-title">Tất cả nhận xét của thực khách</h2>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    Tương tác và trả lời nhận xét giúp tăng uy tín và thiện cảm cho quán
                  </p>
                </div>
              </div>
              <div className="reviews-list">
                {reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            </div>
          )}

          {/* Billing & Subscription Invoices Tab */}
          {activeTab === 'billing' && (
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <h2 className="dashboard-card-title">Lịch sử thanh toán & Hóa đơn VAT</h2>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    Theo dõi chi tiết các gói đăng ký tài trợ và xuất biên lai thanh toán
                  </p>
                </div>
                <Link to="/pricing">
                  <Button variant="primary" size="sm">Đổi gói dịch vụ</Button>
                </Link>
              </div>

              {/* Requirement #18: Responsive DataTable (cards on mobile, table on desktop) */}
              <BusinessDataTable invoices={invoices} />
            </div>
          )}
        </div>
      </div>

      {/* Add Dish Modal */}
      <Modal
        isOpen={isAddDishModalOpen}
        onClose={() => setIsAddDishModalOpen(false)}
        title="Thêm món ăn mới vào thực đơn"
      >
        <form onSubmit={handleAddDish}>
          <Input
            label="Tên món ăn"
            placeholder="Ví dụ: Cơm tấm sườn bì chả"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            required
          />

          <Input
            label="Giá bán (VNĐ)"
            placeholder="Ví dụ: 45000"
            type="number"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
            required
          />

          <Textarea
            label="Mô tả món ăn"
            placeholder="Thành phần, gia vị đặc trưng..."
            value={newDish.description}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
            <input
              type="checkbox"
              checked={newDish.isSignature}
              onChange={(e) => setNewDish({ ...newDish, isSignature: e.target.checked })}
            />
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
              Đánh dấu là món đặc trưng (Signature Dish) của quán
            </span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button type="button" variant="ghost" onClick={() => setIsAddDishModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu món ăn
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
