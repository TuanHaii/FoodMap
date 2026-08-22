/** Directly mirrors the supplied OpenAPI User schema, not the DDL user table. */
export type User = { id: number; name: string; email: string; role: 'user' | 'restaurant_owner' | 'admin'; created_at?: string; updated_at?: string };
export type RegisterRequest = { name: string; email: string; password: string; password_confirmation: string };
export type LoginRequest = { email: string; password: string };
