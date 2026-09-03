export type UserRole = 'user' | 'restaurant_owner' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string | null;
  phone?: string | null;
  bio?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  user: User;
}

export interface ProfileUpdateInput {
  name?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
}
