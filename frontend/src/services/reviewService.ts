import { apiClient } from '../infrastructure/http/apiClient';
import type { Review, CreateReviewInput, RatingBreakdown } from '../domain/review/types';
const mapReview = (review: Review & { content?: string | null }): Review => ({ ...review, comment: review.content ?? '', media: review.media ?? [] });
export const reviewService = {
  async getReviews(slug: string): Promise<{ data: Review[]; breakdown: RatingBreakdown }> { const { data } = await apiClient.get(`/restaurants/${slug}/reviews`); const reviews = data.data.map(mapReview) as Review[]; const total = reviews.length; const distribution = [1,2,3,4,5].reduce((a, n) => ({ ...a, [n]: reviews.filter(r => r.rating === n).length }), {} as RatingBreakdown['distribution']); return { data: reviews, breakdown: { average: total ? reviews.reduce((a, r) => a + r.rating, 0) / total : 0, total_count: total, distribution } }; },
  async createReview(slug: string, input: CreateReviewInput): Promise<Review> { const { data } = await apiClient.post(`/restaurants/${slug}/reviews`, { rating: input.rating, content: input.comment }); return mapReview(data.data); },
  async updateReview(id: number, input: Pick<CreateReviewInput, 'rating' | 'comment'>): Promise<Review> { const { data } = await apiClient.patch(`/reviews/${id}`, { rating: input.rating, content: input.comment }); return mapReview(data.data); },
  async deleteReview(id: number): Promise<void> { await apiClient.delete(`/reviews/${id}`); },
};
