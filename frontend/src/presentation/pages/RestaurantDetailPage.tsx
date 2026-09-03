import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Restaurant } from "../../domain/restaurant/types";
import type {
  Review,
  RatingBreakdown,
  CreateReviewInput,
} from "../../domain/review/types";
import { restaurantService } from "../../services/restaurantService";
import { reviewService } from "../../services/reviewService";
import { favoriteService } from "../../services/favoriteService";
import { checkInService } from "../../services/checkInService";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb } from "../components/common/Breadcrumb/Breadcrumb";
import { ResponsiveImage } from "../components/common/Image/ResponsiveImage";
import { RatingDisplay } from "../components/common/Rating/RatingDisplay";
import { SponsoredBadge } from "../components/common/Badge/SponsoredBadge";
import { VerifiedBadge } from "../components/common/Badge/VerifiedBadge";
import { Badge } from "../components/common/Badge/Badge";
import { Button } from "../components/common/Button/Button";
import { DishCard } from "../components/restaurant/DishCard";
import { ReviewCard } from "../components/review/ReviewCard";
import { RatingBreakdownCard } from "../components/review/RatingBreakdownCard";
import { ReviewForm } from "../components/review/ReviewForm";
import { Modal } from "../components/common/Modal/Modal";
import { Skeleton } from "../components/common/Skeleton/Skeleton";
import { ErrorState } from "../components/common/ErrorState/ErrorState";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  BuildingIcon,
  SparklesIcon,
} from "../components/common/Icons";
import "./RestaurantDetailPage.css";

export const RestaurantDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [breakdown, setBreakdown] = useState<RatingBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isCheckInLoading, setIsCheckInLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const loadData = async () => {
    if (!slug) return;
    setIsLoading(true);
    setHasError(false);
    try {
      const rest = await restaurantService.getRestaurantBySlug(slug);
      if (!rest) {
        setHasError(true);
        return;
      }
      setRestaurant(rest);
      const revData = await reviewService.getReviews(rest.slug);
      setReviews(revData.data);
      setBreakdown(revData.breakdown);
      if (localStorage.getItem("auth_token")) {
        const favorites = await favoriteService.getFavorites();
        setIsFavorite(
          favorites.some((favorite) => favorite.slug === rest.slug),
        );
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void loadData();
    });
  }, [slug]);

  const handleCreateReview = async (input: CreateReviewInput) => {
    if (!restaurant) return;
    const newRev = await reviewService.createReview(restaurant.slug, input);
    setReviews((prev) => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    // Refresh breakdown
    const revData = await reviewService.getReviews(restaurant.slug);
    setBreakdown(revData.breakdown);
  };

  const handleFavorite = async () => {
    if (!restaurant || !isAuthenticated) {
      setActionMessage("Vui lòng đăng nhập để lưu quán.");
      return;
    }
    try {
      if (isFavorite) await favoriteService.remove(restaurant.slug);
      else await favoriteService.add(restaurant.slug);
      setIsFavorite((current) => !current);
      setActionMessage(isFavorite ? "Đã bỏ lưu quán." : "Đã lưu quán.");
    } catch {
      setActionMessage("Không thể cập nhật quán đã lưu. Vui lòng thử lại.");
    }
  };

  const handleCheckIn = async () => {
    if (!restaurant || !isAuthenticated) {
      setActionMessage("Vui lòng đăng nhập để check-in.");
      return;
    }
    setIsCheckInLoading(true);
    try {
      await checkInService.create(restaurant.slug);
      setActionMessage("Check-in thành công.");
    } catch {
      setActionMessage("Không thể check-in. Vui lòng thử lại.");
    } finally {
      setIsCheckInLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: restaurant?.name || "Long Xuyên Food",
          text: `Khám phá quán ngon ${restaurant?.name} tại TP. Long Xuyên`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết vào bộ nhớ tạm!");
    }
  };

  if (isLoading) {
    return (
      <div className="container detail-page">
        <Skeleton width="40%" height="24px" style={{ marginBottom: "16px" }} />
        <Skeleton
          width="100%"
          height="320px"
          borderRadius="var(--radius-xl)"
          style={{ marginBottom: "24px" }}
        />
        <Skeleton width="60%" height="36px" style={{ marginBottom: "12px" }} />
        <Skeleton width="80%" height="20px" />
      </div>
    );
  }

  if (hasError || !restaurant) {
    return (
      <div className="container detail-page">
        <ErrorState
          title="Không tìm thấy thông tin quán ăn"
          description="Quán ăn này không tồn tại hoặc đã tạm dừng hoạt động trên hệ thống."
          onRetry={loadData}
        />
      </div>
    );
  }

  const primaryCategory = restaurant.categories[0]?.name || "Ẩm thực";
  const mainImage =
    restaurant.media[activeImageIndex]?.url || restaurant.media[0]?.url;

  return (
    <div className="detail-page">
      <div className="container">
        {/* Breadcrumb for SEO & Navigation */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khám phá quán ăn", href: "/restaurants" },
            {
              label: primaryCategory,
              href: `/restaurants?category=${restaurant.categories[0]?.slug}`,
            },
            { label: restaurant.name },
          ]}
        />

        {/* Restaurant Header Section */}
        <article className="detail-header-card">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="gallery-main-img">
              <ResponsiveImage
                src={mainImage}
                alt={restaurant.name}
                aspectRatio="16/9"
              />
            </div>
            {restaurant.media.length > 1 && (
              <div className="gallery-thumbs">
                {restaurant.media.slice(0, 3).map((img, idx) => (
                  <div
                    key={img.id}
                    className={`gallery-thumb-item ${idx === activeImageIndex ? "active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <ResponsiveImage
                      src={img.url}
                      alt={img.caption || ""}
                      aspectRatio="4/3"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="detail-info-section">
            <div className="detail-badges-row">
              <Badge variant="primary">{primaryCategory}</Badge>
              {/* Critical Requirement #14: Distinct Sponsored Badge */}
              {restaurant.is_sponsored && (
                <SponsoredBadge label={restaurant.sponsored_label} />
              )}
              {restaurant.is_verified && <VerifiedBadge />}
              {restaurant.opening_hours && (
                <Badge
                  variant={
                    restaurant.opening_hours.is_open_now ? "success" : "danger"
                  }
                >
                  {restaurant.opening_hours.is_open_now
                    ? "Đang mở cửa"
                    : "Đã đóng cửa"}
                </Badge>
              )}
            </div>

            <h1 className="detail-title">{restaurant.name}</h1>

            <RatingDisplay
              score={restaurant.avg_rating}
              reviewCount={restaurant.review_count}
              size={18}
            />

            <div className="detail-meta-list">
              <div className="detail-meta-item">
                <MapPinIcon size={20} className="detail-meta-icon" />
                <span>{restaurant.address}</span>
              </div>
              {restaurant.phone && (
                <div className="detail-meta-item">
                  <PhoneIcon size={20} className="detail-meta-icon" />
                  <a
                    href={`tel:${restaurant.phone}`}
                    style={{ color: "inherit" }}
                  >
                    {restaurant.phone}
                  </a>
                </div>
              )}
              {restaurant.opening_hours && (
                <div className="detail-meta-item">
                  <ClockIcon size={20} className="detail-meta-icon" />
                  <span>
                    {restaurant.opening_hours.open} -{" "}
                    {restaurant.opening_hours.close} (
                    {restaurant.opening_hours.days})
                  </span>
                </div>
              )}
              {restaurant.price_range && (
                <div className="detail-meta-item">
                  <span style={{ fontWeight: 600 }}>Khoảng giá:</span>
                  <span>{restaurant.price_range}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="detail-actions-bar">
              {restaurant.phone && (
                <a href={`tel:${restaurant.phone}`}>
                  <Button variant="primary" leftIcon={<PhoneIcon size={18} />}>
                    Gọi điện đặt bàn
                  </Button>
                </a>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + " " + restaurant.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" leftIcon={<MapPinIcon size={18} />}>
                  Chỉ đường Google Maps
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={handleFavorite}
                leftIcon={
                  <HeartIcon
                    size={18}
                    filled={isFavorite}
                    color={isFavorite ? "var(--color-danger)" : "currentColor"}
                  />
                }
              >
                {isFavorite ? "Đã lưu" : "Lưu quán"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCheckIn}
                isLoading={isCheckInLoading}
              >
                Check-in
              </Button>
              <Button
                variant="ghost"
                onClick={handleShare}
                leftIcon={<ShareIcon size={18} />}
              >
                Chia sẻ
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsReviewModalOpen(true)}
                leftIcon={<SparklesIcon size={18} />}
              >
                Viết đánh giá
              </Button>
            </div>
            {actionMessage && <p role="status">{actionMessage}</p>}
          </div>
        </article>

        {/* Content Columns */}
        <div className="detail-content-layout">
          {/* Main Column */}
          <div className="detail-main-col">
            {/* Description / Introduction */}
            {restaurant.description && (
              <section
                className="detail-section"
                aria-labelledby="desc-heading"
              >
                <h2 id="desc-heading" className="detail-section-title">
                  Giới thiệu quán
                </h2>
                <p className="detail-description-text">
                  {restaurant.description}
                </p>
              </section>
            )}

            {/* Signature Dishes & Menu */}
            {restaurant.dishes && restaurant.dishes.length > 0 && (
              <section
                className="detail-section"
                aria-labelledby="menu-heading"
              >
                <h2 id="menu-heading" className="detail-section-title">
                  Thực đơn đặc trưng
                </h2>
                <div className="dishes-grid">
                  {restaurant.dishes.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section
              className="detail-section"
              aria-labelledby="reviews-heading"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 id="reviews-heading" className="detail-section-title">
                  Đánh giá từ thực khách ({reviews.length})
                </h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Viết nhận xét
                </Button>
              </div>

              {breakdown && <RatingBreakdownCard breakdown={breakdown} />}

              <div className="reviews-list">
                {reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="detail-sidebar-col">
            {/* Owner Claim Box */}
            <div className="claim-box">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <BuildingIcon size={22} color="var(--color-primary)" />
                <h3 className="claim-box-title">Bạn là chủ quán này?</h3>
              </div>
              <p className="claim-box-desc">
                Xác nhận quyền sở hữu để chỉnh sửa thông tin, cập nhật menu, trả
                lời đánh giá của thực khách và tiếp cận thêm nhiều khách hàng
                tại Long Xuyên.
              </p>
              <Link to={`/restaurants/${restaurant.slug}/claim`}>
                <Button variant="primary" size="sm" fullWidth>
                  Xác nhận sở hữu quán
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Gửi đánh giá ẩm thực"
      >
        <ReviewForm
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          onSubmit={handleCreateReview}
          onCancel={() => setIsReviewModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
