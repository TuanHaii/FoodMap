export interface Media {
  id: number;
  url: string;
  thumbnail_url?: string;
  caption?: string | null;
  mime_type?: string;
  size?: number;
  created_at?: string;
}

export interface MediaUploadResponse {
  id: number;
  url: string;
  thumbnail_url?: string;
}
