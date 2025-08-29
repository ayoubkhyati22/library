import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, getCurrentSession, signIn as authSignIn, signOut as authSignOut, onAuthStateChange } from '../lib/auth';
import type { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    getCurrentSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { user, error } = await authSignIn(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, []);

  const signOut = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await authSignOut();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, []);

  return {
    user,
    session,
    isAuthenticated: !!user,
    loading,
    signIn,
    signOut,
  };
}