import { apiClient } from '../infrastructure/http/apiClient';
import type { Category, Restaurant, RestaurantSearchParams, SubmitRestaurantInput } from '../domain/restaurant/types';

type ApiRestaurant = Omit<Restaurant, 'categories' | 'review_count'> & { category?: Category | null; rating_count: number };
const fromApi = (item: ApiRestaurant): Restaurant => ({ ...item, categories: item.category ? [item.category] : [], review_count: item.rating_count, media: item.media ?? [] });
const page = (payload: { data: ApiRestaurant[]; meta: { total: number; current_page: number; last_page: number } }) => ({ data: payload.data.map(fromApi), total: payload.meta.total, page: payload.meta.current_page, total_pages: payload.meta.last_page });

export const restaurantService = {
  async getCategories(): Promise<Category[]> { const { data } = await apiClient.get<{ data: Category[] }>('/categories'); return data.data; },
  async getRestaurants(params?: RestaurantSearchParams): Promise<{ data: Restaurant[]; total: number; page: number; total_pages: number }> { const { data } = await apiClient.get('/restaurants', { params: { category: params?.category_id, sort: params?.sort_by, page: params?.page, per_page: params?.limit } }); return page(data); },
  async searchRestaurants(params?: RestaurantSearchParams): Promise<{ data: Restaurant[]; total: number; page: number; total_pages: number }> { const { data } = await apiClient.get('/restaurants/search', { params: { q: params?.q, category: params?.category_id, sort: params?.sort_by, page: params?.page, per_page: params?.limit } }); return page(data); },
  async getRestaurantBySlug(slug: string): Promise<Restaurant> { const { data } = await apiClient.get<{ data: ApiRestaurant }>(`/restaurants/${slug}`); return fromApi(data.data); },
  async submitRestaurant(input: SubmitRestaurantInput): Promise<{ success: boolean; message: string }> { await apiClient.post('/restaurants', { name: input.name, address: input.address, ward: input.ward, phone: input.phone, category_id: input.category_ids[0], price_range: input.price_range, description: input.description, city: 'Long Xuyên' }); return { success: true, message: 'Đề xuất quán đã được gửi để xét duyệt.' }; },
};
