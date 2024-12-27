export const AUTH_ERRORS = {
  NOT_AUTHENTICATED: 'Please sign in to continue',
  INVALID_CREDENTIALS: 'Invalid email or password',
  MISSING_ENV_VARS: 'Missing Supabase environment variables',
} as const;

export const METRIC_ERRORS = {
  FETCH_ERROR: 'Unable to fetch metrics',
  UPDATE_ERROR: 'Unable to update metrics',
  CREATE_ERROR: 'Unable to create metrics',
} as const;