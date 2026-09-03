import React from 'react';
import { Link } from 'react-router-dom';
import type { Restaurant } from '../../../domain/restaurant/types';
import { ResponsiveImage } from '../common/Image/ResponsiveImage';
import { RatingDisplay } from '../common/Rating/RatingDisplay';
import { SponsoredBadge } from '../common/Badge/SponsoredBadge';
import { VerifiedBadge } from '../common/Badge/VerifiedBadge';
import { MapPinIcon } from '../common/Icons';
import './RestaurantCard.css';

export interface RestaurantCardProps {
  restaurant: Restaurant;
  horizontal?: boolean;
  className?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  horizontal = false,
  className = '',
}) => {
  const primaryCategory = restaurant.categories[0]?.name || 'Ẩm thực';
  const mainImage = restaurant.media[0]?.url;
  const isOpen = restaurant.opening_hours?.is_open_now;

  return (
    <Link
      to={`/restaurants/${restaurant.slug || restaurant.id}`}
      className={`restaurant-card ${horizontal ? 'restaurant-card-horizontal' : ''} ${className}`}
      aria-label={`Xem chi tiết quán ${restaurant.name}`}
    >
      <div className="restaurant-card-media">
        <ResponsiveImage
          src={mainImage}
          alt={restaurant.name}
          aspectRatio={horizontal ? '1/1' : '16/9'}
        />
        <div className="restaurant-card-badges">
          {/* Critical Requirement #14: Distinct Sponsored Badge */}
          {restaurant.is_sponsored && <SponsoredBadge label={restaurant.sponsored_label} />}
          {restaurant.is_verified && <VerifiedBadge />}
        </div>
        {restaurant.opening_hours && (
          <div className="restaurant-card-status">
            <span className={`status-indicator ${isOpen ? 'open' : 'closed'}`}>
              {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
            </span>
          </div>
        )}
      </div>

      <div className="restaurant-card-content">
        <span className="restaurant-card-category">{primaryCategory}</span>
        <h3 className="restaurant-card-name">{restaurant.name}</h3>

        <div className="restaurant-card-meta">
          <RatingDisplay
            score={restaurant.avg_rating}
            reviewCount={restaurant.review_count}
            size={14}
          />
        </div>

        <div className="restaurant-card-address">
          <MapPinIcon size={15} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{restaurant.ward ? `P. ${restaurant.ward}, TP. Long Xuyên` : restaurant.address}</span>
        </div>

        <div className="restaurant-card-footer">
          {restaurant.price_range && (
            <span className="restaurant-price-range">{restaurant.price_range}</span>
          )}
          {restaurant.checkin_count ? (
            <span>{restaurant.checkin_count.toLocaleString('vi-VN')} lượt ghé</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
