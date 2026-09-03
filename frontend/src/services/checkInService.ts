import { apiClient } from '../infrastructure/http/apiClient';

export interface CheckIn {
  id: number;
  restaurant_id: number;
  created_at?: string;
  restaurant?: { id: number; name: string; slug: string };
}

export const checkInService = {
  async getCheckIns(): Promise<CheckIn[]> {
    const response = await apiClient.get<{ data: CheckIn[] }>('/me/check-ins');
    return response.data.data;
  },

  async create(slug: string, location?: { latitude: number; longitude: number }): Promise<CheckIn> {
    const response = await apiClient.post<{ data: CheckIn }>(`/restaurants/${slug}/check-ins`, location);
    return response.data.data;
  },
};
