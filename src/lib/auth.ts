import { supabase } from './supabase';
import { AuthError } from './errors/AuthError';
import { AUTH_ERRORS } from './constants/errorMessages';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new AuthError(AUTH_ERRORS.INVALID_CREDENTIALS);
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new AuthError(error.message);
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message);
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw new AuthError(AUTH_ERRORS.NOT_AUTHENTICATED);
    return { user, error: null };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null, error };
  }
}