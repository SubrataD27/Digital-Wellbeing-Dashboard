import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { AUTH_ERRORS } from './constants/errorMessages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(AUTH_ERRORS.MISSING_ENV_VARS);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);