import type { Media } from '../media/types';
export type ReviewUser = { id: number; name: string };
export type Review = { id: number; user: ReviewUser; restaurant_id: number; rating: number; comment?: string | null; media?: Media[]; created_at?: string; updated_at?: string };
