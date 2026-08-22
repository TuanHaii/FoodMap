import type { User } from '../user/types';
import type { Media } from '../media/types';
export type Category = { id: number; name: string };
export type Restaurant = { id: number; name: string; address: string; description?: string | null; latitude: number; longitude: number; avg_rating: number; review_count: number; categories: Category[]; media: Media[]; owner?: User | null; created_at?: string; updated_at?: string };
