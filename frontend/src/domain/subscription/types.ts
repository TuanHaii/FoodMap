export type SubscriptionStatus = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'EXPIRED' | 'PAUSED';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  badge?: string;
  features: string[];
  is_popular?: boolean;
}

export interface BusinessDashboardStats {
  views_this_month: number;
  views_growth_percent: number;
  total_reviews: number;
  new_reviews_this_week: number;
  avg_rating: number;
  checkins_count: number;
  favorites_count: number;
}

export interface BusinessInvoice {
  id: string;
  date: string;
  plan_name: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  pdf_url?: string;
}
