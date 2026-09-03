import type { Media } from '../media/types';

export interface ReviewUser {
  id: number;
  name: string;
  avatar_url?: string | null;
}

export interface ReviewReply {
  id: number;
  user_id: number;
  user_name: string;
  comment: string;
  created_at: string;
}

export interface Review {
  id: number;
  user: ReviewUser;
  restaurant_id: number;
  restaurant_name?: string;
  rating: number;
  comment?: string | null;
  media?: Media[];
  reply?: ReviewReply | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateReviewInput {
  restaurant_id: number;
  rating: number;
  comment: string;
  media_ids?: number[];
}

export interface RatingBreakdown {
  average: number;
  total_count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
