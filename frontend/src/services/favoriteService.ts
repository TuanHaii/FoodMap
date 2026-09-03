import { apiClient } from '../infrastructure/http/apiClient';
import type { Restaurant } from '../domain/restaurant/types';

export const favoriteService = {
  async getFavorites(): Promise<Restaurant[]> {
    const response = await apiClient.get<{ data: Restaurant[] }>('/me/favorites');
    return response.data.data;
  },

  async add(slug: string): Promise<void> {
    await apiClient.post(`/restaurants/${slug}/favorite`);
  },

  async remove(slug: string): Promise<void> {
    await apiClient.delete(`/restaurants/${slug}/favorite`);
  },
};
