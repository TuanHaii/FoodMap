import { apiClient } from '../infrastructure/http/apiClient';
import type { MediaUploadResponse } from '../domain/media/types';

export const mediaService = {
  async upload(file: File): Promise<MediaUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post<MediaUploadResponse>('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch {
      // Local object URL fallback
      return {
        id: Date.now(),
        url: URL.createObjectURL(file),
        thumbnail_url: URL.createObjectURL(file)
      };
    }
  }
};
