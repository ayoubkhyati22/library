import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name_fr: string;
          name_en: string;
          name_ar: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_fr: string;
          name_en: string;
          name_ar: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_fr?: string;
          name_en?: string;
          name_ar?: string;
          slug?: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          title_fr: string;
          title_en: string;
          title_ar: string;
          price: number;
          image: string;
          category_id: string;
          description_fr: string;
          description_en: string;
          description_ar: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title_fr: string;
          title_en: string;
          title_ar: string;
          price: number;
          image?: string;
          category_id: string;
          description_fr?: string;
          description_en?: string;
          description_ar?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string;
          title_en?: string;
          title_ar?: string;
          price?: number;
          image?: string;
          category_id?: string;
          description_fr?: string;
          description_en?: string;
          description_ar?: string;
          created_at?: string;
        };
      };
    };
  };
}