import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Metric, MetricUpdate } from '../types/metrics';
import { getCurrentUser } from '../lib/auth';
import { getTodayDate } from '../lib/date';
import { fetchUserMetrics, createInitialMetrics, updateUserMetrics } from '../lib/metrics';

interface MetricStore {
  metrics: Metric[];
  loading: boolean;
  error: string | null;
  fetchTodayMetrics: () => Promise<void>;
  updateMetrics: (update: MetricUpdate) => Promise<void>;
  subscribeToUpdates: () => () => void;
  clearError: () => void;
}

export const useMetricStore = create<MetricStore>((set, get) => ({
  metrics: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTodayMetrics: async () => {
    set({ loading: true, error: null });
    try {
      const { user, error: userError } = await getCurrentUser();
      if (userError) throw userError;
      if (!user) throw new Error('Please sign in to view metrics');

      const today = getTodayDate();
      const { data, error } = await fetchUserMetrics(user.id, today);
      if (error) throw error;
      
      if (!data || data.length === 0) {
        const newMetric = await createInitialMetrics(user.id, today);
        set({ metrics: [newMetric], loading: false });
      } else {
        set({ metrics: data as Metric[], loading: false });
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      set({ 
        error: (error as Error).message,
        loading: false,
        metrics: [] 
      });
    }
  },

  updateMetrics: async (update: MetricUpdate) => {
    set({ error: null });
    try {
      const { user, error: userError } = await getCurrentUser();
      if (userError) throw userError;
      if (!user) throw new Error('Please sign in to update metrics');

      const today = getTodayDate();
      await updateUserMetrics(user.id, today, update);
      await get().fetchTodayMetrics();
    } catch (error) {
      console.error('Error updating metrics:', error);
      set({ error: (error as Error).message });
    }
  },

  subscribeToUpdates: () => {
    const { user } = supabase.auth.getSession() || {};
    if (!user) return () => {};

    const metricsSubscription = supabase
      .channel('metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'metrics'
        },
        () => {
          get().fetchTodayMetrics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(metricsSubscription);
    };
  }
}));