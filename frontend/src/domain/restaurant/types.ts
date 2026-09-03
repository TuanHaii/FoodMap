import type { User } from '../user/types';
import type { Media } from '../media/types';

export interface Category {
  id: number;
  name: string;
  slug?: string;
  icon?: string;
  restaurant_count?: number;
}

export interface Dish {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  is_signature?: boolean;
  category?: string;
}

export interface OpeningHours {
  open: string;
  close: string;
  days: string;
  is_open_now?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  address: string;
  ward?: string;
  phone?: string;
  price_range?: string; // e.g. '25.000đ - 70.000đ'
  description?: string | null;
  latitude: number;
  longitude: number;
  avg_rating: number;
  review_count: number;
  categories: Category[];
  media: Media[];
  dishes?: Dish[];
  opening_hours?: OpeningHours;
  owner?: User | null;
  is_verified?: boolean;
  is_sponsored?: boolean; // Critical: Dedicated badge & treatment
  sponsored_label?: string; // e.g. 'Được tài trợ'
  checkin_count?: number;
  favorite_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface RestaurantSearchParams {
  q?: string;
  category_id?: number;
  rating?: number;
  sort_by?: 'rating' | 'popular' | 'newest' | 'reviews';
  is_open?: boolean;
  page?: number;
  limit?: number;
}

export interface SubmitRestaurantInput {
  name: string;
  address: string;
  ward: string;
  phone?: string;
  category_ids: number[];
  price_range?: string;
  opening_hours?: string;
  description?: string;
  media_urls?: string[];
}

export interface ClaimRestaurantInput {
  restaurant_id: number;
  owner_name: string;
  phone: string;
  identity_card_number?: string;
  business_license_url?: string;
  note?: string;
}
