import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { favoriteService } from "../../services/favoriteService";
import { checkInService, type CheckIn } from "../../services/checkInService";
import type { Restaurant } from "../../domain/restaurant/types";
import { Breadcrumb } from "../components/common/Breadcrumb/Breadcrumb";
import { Input } from "../components/common/Input/Input";
import { Textarea } from "../components/common/Textarea/Textarea";
import { Button } from "../components/common/Button/Button";
import { Tabs } from "../components/common/Tabs/Tabs";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { EmptyState } from "../components/common/EmptyState/EmptyState";
import { ErrorState } from "../components/common/ErrorState/ErrorState";
import { UserIcon, CheckCircleIcon } from "../components/common/Icons";
import "./ProfilePage.css";

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("favorites");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        await authService.getProfile();
        const [favoriteData, checkInData] = await Promise.all([
          favoriteService.getFavorites(),
          checkInService.getCheckIns(),
        ]);
        setFavorites(favoriteData);
        setCheckIns(checkInData);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    try {
      setSaveSuccess(false);
      setSaveError("API cập nhật hồ sơ chưa được backend cung cấp.");
    } catch {
      setSaveError("Không thể cập nhật hồ sơ. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Trang cá nhân" },
          ]}
        />

        <div className="profile-layout">
          {/* User Header Card */}
          <div className="profile-header-card">
            <div className="profile-avatar-wrapper">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="profile-avatar-lg"
                />
              ) : (
                <div
                  className="profile-avatar-lg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--color-bg-muted)",
                  }}
                >
                  <UserIcon size={40} color="var(--color-text-secondary)" />
                </div>
              )}
            </div>
            <div className="profile-info-text">
              <h1 className="profile-user-name">
                {user?.name || "Thành viên Long Xuyên"}
              </h1>
              <p className="profile-user-email">{user?.email}</p>
              <div className="profile-role-badge">
                {user?.role === "restaurant_owner"
                  ? "🏪 Chủ cơ sở kinh doanh"
                  : "👤 Thành viên ẩm thực"}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs
            tabs={[
              {
                id: "favorites",
                label: "Quán ăn đã lưu",
                count: favorites.length,
              },
              { id: "reviews", label: "Đánh giá đã viết", count: 0 },
              { id: "check-ins", label: "Check-in", count: checkIns.length },
              { id: "settings", label: "Thông tin cá nhân" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className="profile-tab-content">
            {hasError && (
              <ErrorState onRetry={() => window.location.reload()} />
            )}
            {isLoading && <p>Đang tải dữ liệu hồ sơ...</p>}
            {!isLoading && !hasError && activeTab === "favorites" && (
              <div className="favorites-grid">
                {favorites.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
                {favorites.length === 0 && (
                  <EmptyState
                    title="Chưa có quán đã lưu"
                    description="Các quán bạn lưu sẽ xuất hiện ở đây."
                  />
                )}
              </div>
            )}

            {!isLoading && !hasError && activeTab === "reviews" && (
              <EmptyState
                title="Chưa có dữ liệu đánh giá cá nhân"
                description="API hiện tại chưa cung cấp danh sách đánh giá theo người dùng."
              />
            )}

            {!isLoading && !hasError && activeTab === "check-ins" && (
              <div className="profile-reviews-list">
                {checkIns.map((checkIn) => (
                  <p key={checkIn.id}>
                    {checkIn.restaurant?.name ||
                      `Nhà hàng #${checkIn.restaurant_id}`}
                  </p>
                ))}
                {checkIns.length === 0 && (
                  <EmptyState
                    title="Chưa có check-in"
                    description="Các lần check-in của bạn sẽ xuất hiện ở đây."
                  />
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <form
                className="profile-settings-card"
                onSubmit={handleSaveProfile}
              >
                <h3
                  style={{
                    fontSize: "var(--font-size-lg)",
                    fontWeight: 700,
                    marginBottom: "16px",
                  }}
                >
                  Cập nhật thông tin tài khoản
                </h3>

                {saveSuccess && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 14px",
                      backgroundColor: "var(--color-success-bg)",
                      color: "var(--color-success-text)",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "16px",
                    }}
                  >
                    <CheckCircleIcon size={18} />
                    <span>Lưu thông tin thành công!</span>
                  </div>
                )}
                {saveError && <p className="form-error-msg">{saveError}</p>}

                <Input
                  label="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Số điện thoại"
                  type="tel"
                  placeholder="0901 234 567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <Textarea
                  label="Giới thiệu bản thân"
                  placeholder="Chia sẻ đôi nét về sở thích ẩm thực của bạn..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "12px",
                  }}
                >
                  <Button type="submit" variant="primary" isLoading={isSaving}>
                    Lưu thay đổi
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
