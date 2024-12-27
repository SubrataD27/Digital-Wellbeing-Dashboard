import { AuthError } from '../errors/AuthError';
import { MetricError } from '../errors/MetricError';

export function handleError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error('An unexpected error occurred');
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function isMetricError(error: unknown): error is MetricError {
  return error instanceof MetricError;
}