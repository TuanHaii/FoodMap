import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/common/Breadcrumb/Breadcrumb';
import { Input } from '../components/common/Input/Input';
import { Textarea } from '../components/common/Textarea/Textarea';
import { Select } from '../components/common/Select/Select';
import { Button } from '../components/common/Button/Button';
import { CheckCircleIcon, PlusIcon } from '../components/common/Icons';
import { restaurantService } from '../../services/restaurantService';
import type { SubmitRestaurantInput } from '../../domain/restaurant/types';
import './SubmitRestaurantPage.css';

const WARDS_OF_LONG_XUYEN = [
  { value: '', label: '-- Chọn Phường / Xã tại Long Xuyên --' },
  { value: 'Mỹ Long', label: 'Phường Mỹ Long' },
  { value: 'Mỹ Bình', label: 'Phường Mỹ Bình' },
  { value: 'Mỹ Phước', label: 'Phường Mỹ Phước' },
  { value: 'Mỹ Quý', label: 'Phường Mỹ Quý' },
  { value: 'Mỹ Thới', label: 'Phường Mỹ Thới' },
  { value: 'Mỹ Thạnh', label: 'Phường Mỹ Thạnh' },
  { value: 'Mỹ Hòa', label: 'Phường Mỹ Hòa' },
  { value: 'Mỹ Xuyên', label: 'Phường Mỹ Xuyên' },
  { value: 'Bình Khánh', label: 'Phường Bình Khánh' },
  { value: 'Bình Đức', label: 'Phường Bình Đức' },
  { value: 'Mỹ Khánh', label: 'Xã Mỹ Khánh' },
  { value: 'Mỹ Hòa Hưng', label: 'Xã Mỹ Hòa Hưng (Cù Lao Ông Hổ)' },
];

const FOOD_CATEGORIES = [
  { id: 2, name: 'Cơm tấm' },
  { id: 3, name: 'Bún cá An Giang' },
  { id: 4, name: 'Lẩu mắm' },
  { id: 5, name: 'Bánh xèo & Ăn vặt' },
  { id: 6, name: 'Cà phê & Trà' },
  { id: 7, name: 'Quán nhậu & Hải sản' },
];

export const SubmitRestaurantPage: React.FC = () => {
  const [formData, setFormData] = useState<SubmitRestaurantInput>({
    name: '',
    address: '',
    ward: '',
    phone: '',
    category_ids: [],
    price_range: '',
    opening_hours: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategoryToggle = (id: number) => {
    setFormData((prev) => {
      const exists = prev.category_ids.includes(id);
      return {
        ...prev,
        category_ids: exists
          ? prev.category_ids.filter((c) => c !== id)
          : [...prev.category_ids, id],
      };
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Vui lòng nhập tên quán ăn';
    if (!formData.ward) errs.ward = 'Vui lòng chọn phường/xã tại Long Xuyên';
    if (!formData.address.trim()) errs.address = 'Vui lòng nhập địa chỉ chi tiết';
    if (formData.category_ids.length === 0) errs.categories = 'Vui lòng chọn ít nhất 1 danh mục món ăn';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await restaurantService.submitRestaurant(formData);
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="container form-page-container">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Đề xuất quán mới' },
          ]}
        />

        <div className="form-card">
          <div className="form-header">
            <h1 className="form-page-title">Đề xuất quán ăn mới tại Long Xuyên</h1>
            <p className="form-page-subtitle">
              Bạn biết một quán ngon chưa có trên bản đồ? Hãy chia sẻ với cộng đồng người sành ăn Long Xuyên!
            </p>
          </div>

          {isSuccess ? (
            <div className="success-banner">
              <CheckCircleIcon size={48} color="var(--color-success)" />
              <h2 className="success-banner-title">Cảm ơn bạn đã đóng góp quán ngon!</h2>
              <p className="success-banner-desc">
                Thông tin quán ăn đã được gửi thành công đến đội ngũ biên tập Long Xuyên Food. Chúng tôi sẽ kiểm duyệt và đưa lên trang chủ trong thời gian sớm nhất.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Đề xuất thêm quán khác
                </Button>
                <Link to="/restaurants">
                  <Button variant="primary">Khám phá các quán khác</Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: Tên quán & Phường xã (1 col on mobile, 2 col on desktop) */}
              <div className="form-grid-2">
                <Input
                  label="Tên quán ăn / Nhà hàng"
                  placeholder="Ví dụ: Cơm tấm Cây Điệp, Bún cá Bé Hai..."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: '' });
                  }}
                  error={errors.name}
                  required
                />

                <Select
                  label="Phường / Xã tại TP. Long Xuyên"
                  options={WARDS_OF_LONG_XUYEN}
                  value={formData.ward}
                  onChange={(e) => {
                    setFormData({ ...formData, ward: e.target.value });
                    setErrors({ ...errors, ward: '' });
                  }}
                  error={errors.ward}
                  required
                />
              </div>

              {/* Row 2: Địa chỉ chi tiết */}
              <Input
                label="Địa chỉ số nhà & tên đường"
                placeholder="Ví dụ: 67 Lý Tự Trọng, gần ngã tư Thoại Ngọc Hầu"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setErrors({ ...errors, address: '' });
                }}
                error={errors.address}
                required
              />

              {/* Row 3: Số điện thoại & Khoảng giá */}
              <div className="form-grid-2">
                <Input
                  label="Số điện thoại liên hệ quán (nếu có)"
                  placeholder="Ví dụ: 0296 3841 241"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <Input
                  label="Khoảng giá trung bình"
                  placeholder="Ví dụ: 30.000đ - 60.000đ"
                  value={formData.price_range || ''}
                  onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                />
              </div>

              {/* Categories */}
              <div className="form-field">
                <span className="form-label">
                  Danh mục món ăn phù hợp <span className="form-label-required">*</span>
                </span>
                <div className="category-checkbox-group">
                  {FOOD_CATEGORIES.map((cat) => (
                    <label key={cat.id} className="category-checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.category_ids.includes(cat.id)}
                        onChange={() => {
                          handleCategoryToggle(cat.id);
                          setErrors({ ...errors, categories: '' });
                        }}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <p className="form-error-msg">{errors.categories}</p>}
              </div>

              {/* Description */}
              <Textarea
                label="Mô tả món ăn đặc sắc hoặc kinh nghiệm ăn uống"
                placeholder="Quán có món nào ngon nhất? Không gian và thái độ phục vụ ra sao? Gợi ý thời gian ghé quán thích hợp..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              {errors.form && <p className="form-error-msg">{errors.form}</p>}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} leftIcon={<PlusIcon size={18} />}>
                  Gửi đề xuất quán
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
