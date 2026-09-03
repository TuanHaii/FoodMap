import { apiClient } from '../infrastructure/http/apiClient';
import type { SubscriptionPlan, BusinessDashboardStats, BusinessInvoice } from '../domain/subscription/types';
import { MOCK_SUBSCRIPTION_PLANS, MOCK_DASHBOARD_STATS, MOCK_INVOICES } from './mockData';

export const businessService = {
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
      const response = await apiClient.get<SubscriptionPlan[]>('/subscription/plans');
      return response.data;
    } catch {
      return MOCK_SUBSCRIPTION_PLANS;
    }
  },

  async getDashboardStats(restaurantId: number): Promise<BusinessDashboardStats> {
    try {
      const response = await apiClient.get<BusinessDashboardStats>(`/owner/restaurants/${restaurantId}/dashboard-stats`);
      return response.data;
    } catch {
      return MOCK_DASHBOARD_STATS;
    }
  },

  async getInvoices(): Promise<BusinessInvoice[]> {
    try {
      const response = await apiClient.get<BusinessInvoice[]>('/owner/invoices');
      return response.data;
    } catch {
      return MOCK_INVOICES;
    }
  }
};
