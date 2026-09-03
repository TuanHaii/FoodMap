import { apiClient } from '../infrastructure/http/apiClient';
import type { User, LoginRequest, RegisterRequest, AuthResponse, ProfileUpdateInput } from '../domain/user/types';

type AuthApiResponse = { data: AuthResponse };
type UserApiResponse = { data: User };

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthApiResponse>('/auth/login', credentials);
    const auth = response.data.data;
    localStorage.setItem('auth_token', auth.token);
    localStorage.setItem('auth_user', JSON.stringify(auth.user));
    return auth;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthApiResponse>('/auth/register', data);
    const auth = response.data.data;
    localStorage.setItem('auth_token', auth.token);
    localStorage.setItem('auth_user', JSON.stringify(auth.user));
    return auth;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignored for offline
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async updateProfile(data: ProfileUpdateInput): Promise<User> {
    const response = await apiClient.put<UserApiResponse>('/user', data);
    const user = response.data.data;
    localStorage.setItem('auth_user', JSON.stringify(user));
    return user;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<UserApiResponse>('/me');
    const user = response.data.data;
    localStorage.setItem('auth_user', JSON.stringify(user));
    return user;
  }
};
