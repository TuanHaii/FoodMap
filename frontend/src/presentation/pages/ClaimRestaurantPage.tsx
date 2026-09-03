import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/common/Breadcrumb/Breadcrumb";
import { Input } from "../components/common/Input/Input";
import { Textarea } from "../components/common/Textarea/Textarea";
import { Button } from "../components/common/Button/Button";
import { ShieldCheckIcon, BuildingIcon } from "../components/common/Icons";
import { restaurantService } from "../../services/restaurantService";
import type { Restaurant } from "../../domain/restaurant/types";
import "../pages/SubmitRestaurantPage.css";

export const ClaimRestaurantPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [identityCard, setIdentityCard] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      restaurantService.getRestaurantBySlug(slug).then((res) => {
        if (res) setRestaurant(res);
      });
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !phone.trim()) {
      setError("Vui lòng điền họ tên và số điện thoại liên hệ");
      return;
    }

    if (!restaurant) return;

    setError("Tính năng xác nhận chủ sở hữu chưa được backend cung cấp.");
  };

  return (
    <div className="form-page">
      <div className="container form-page-container">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            {
              label: restaurant?.name || "Chi tiết quán",
              href: `/restaurants/${slug}`,
            },
            { label: "Xác nhận chủ sở hữu" },
          ]}
        />

        <div className="form-card">
          <div className="form-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <ShieldCheckIcon size={28} color="var(--color-primary)" />
              <h1 className="form-page-title" style={{ margin: 0 }}>
                Xác thực chủ sở hữu: {restaurant?.name || "Quán ăn"}
              </h1>
            </div>
            <p className="form-page-subtitle">Địa chỉ: {restaurant?.address}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <Input
                label="Họ và tên chủ quán / Người đại diện"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
              <Input
                label="Số điện thoại chính chủ"
                placeholder="Ví dụ: 0909 123 456"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Input
              label="Số CMND / Căn cước công dân (CCCD)"
              placeholder="Nhập 9 hoặc 12 số định danh cá nhân"
              value={identityCard}
              onChange={(e) => setIdentityCard(e.target.value)}
              helperText="Thông tin này chỉ dùng cho mục đích xác minh quyền sở hữu hợp pháp."
            />

            <Textarea
              label="Ghi chú thêm hoặc giấy phép kinh doanh (nếu có)"
              placeholder="Cung cấp thông tin chứng minh như thời gian bắt đầu mở quán, liên kết Fanpage quán ăn, hoặc giấy đăng ký kinh doanh..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {error && <p className="form-error-msg">{error}</p>}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<BuildingIcon size={18} />}
              >
                Gửi yêu cầu xác thực
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
