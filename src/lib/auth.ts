import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  session?: Session;
}

export async function signUp(email: string, password: string): Promise<{ user: User | null; error: any }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { user: data.user, error };
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: any }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { user: data.user, error };
}

export async function signOut(): Promise<{ error: any }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback);
}