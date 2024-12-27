import { supabase } from './supabase';
import type { Metric, MetricUpdate } from '../types/metrics';
import { MetricError } from './errors/MetricError';
import { METRIC_ERRORS } from './constants/errorMessages';

export async function fetchUserMetrics(userId: string, date: string) {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('date', date)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new MetricError(METRIC_ERRORS.FETCH_ERROR);
    }

    return { data, error: null };
  } catch (error) {
    console.error('Fetch metrics error:', error);
    return { data: null, error };
  }
}

export async function createInitialMetrics(userId: string, date: string) {
  try {
    const newMetric = {
      date,
      user_id: userId,
      focus_time: 0,
      screen_breaks: 0,
      activity_score: 0,
      sleep_quality: 'Fair',
      mindful_minutes: 0,
      daylight_exposure: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('metrics')
      .insert([newMetric]);

    if (error) {
      throw new MetricError(METRIC_ERRORS.CREATE_ERROR);
    }

    return newMetric as Metric;
  } catch (error) {
    console.error('Create metrics error:', error);
    throw error;
  }
}

export async function updateUserMetrics(userId: string, date: string, update: MetricUpdate) {
  try {
    const { error } = await supabase
      .from('metrics')
      .upsert([{ 
        ...update, 
        date,
        user_id: userId,
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      throw new MetricError(METRIC_ERRORS.UPDATE_ERROR);
    }
  } catch (error) {
    console.error('Update metrics error:', error);
    throw error;
  }
}