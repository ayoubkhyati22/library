import { supabase } from './supabase';
import type { Database } from './supabase';

export interface LocalizedText {
  fr: string;
  en: string;
  ar: string;
}

export interface Category {
  id: string;
  name: LocalizedText;
  slug: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: LocalizedText;
  price: number;
  image: string;
  categoryId: string;
  description: LocalizedText;
  createdAt: string;
}

type DbCategory = Database['public']['Tables']['categories']['Row'];
type DbProduct = Database['public']['Tables']['products']['Row'];

// Transform database row to app format
function transformCategory(dbCategory: DbCategory): Category {
  return {
    id: dbCategory.id,
    name: {
      fr: dbCategory.name_fr,
      en: dbCategory.name_en,
      ar: dbCategory.name_ar,
    },
    slug: dbCategory.slug,
    createdAt: dbCategory.created_at,
  };
}

function transformProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    title: {
      fr: dbProduct.title_fr,
      en: dbProduct.title_en,
      ar: dbProduct.title_ar,
    },
    price: dbProduct.price,
    image: dbProduct.image,
    categoryId: dbProduct.category_id,
    description: {
      fr: dbProduct.description_fr,
      en: dbProduct.description_en,
      ar: dbProduct.description_ar,
    },
    createdAt: dbProduct.created_at,
  };
}

// Categories CRUD
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data.map(transformCategory);
}

export async function saveCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name_fr: category.name.fr,
      name_en: category.name.en,
      name_ar: category.name.ar,
      slug: category.slug,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving category:', error);
    throw error;
  }

  return transformCategory(data);
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const updateData: any = {};
  
  if (updates.name) {
    updateData.name_fr = updates.name.fr;
    updateData.name_en = updates.name.en;
    updateData.name_ar = updates.name.ar;
  }
  
  if (updates.slug) {
    updateData.slug = updates.slug;
  }

  const { data, error } = await supabase
    .from('categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }

  return transformCategory(data);
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }

  return true;
}

// Products CRUD
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data.map(transformProduct);
}

export async function getProductsByCategory(categoryId?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data.map(transformProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return getProducts();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`title_fr.ilike.%${query}%,title_en.ilike.%${query}%,title_ar.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    throw error;
  }

  return data.map(transformProduct);
}

export async function saveProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      title_fr: product.title.fr,
      title_en: product.title.en,
      title_ar: product.title.ar,
      price: product.price,
      image: product.image,
      category_id: product.categoryId,
      description_fr: product.description.fr,
      description_en: product.description.en,
      description_ar: product.description.ar,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving product:', error);
    throw error;
  }

  return transformProduct(data);
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const updateData: any = {};
  
  if (updates.title) {
    updateData.title_fr = updates.title.fr;
    updateData.title_en = updates.title.en;
    updateData.title_ar = updates.title.ar;
  }
  
  if (updates.price !== undefined) {
    updateData.price = updates.price;
  }
  
  if (updates.image) {
    updateData.image = updates.image;
  }
  
  if (updates.categoryId) {
    updateData.category_id = updates.categoryId;
  }
  
  if (updates.description) {
    updateData.description_fr = updates.description.fr;
    updateData.description_en = updates.description.en;
    updateData.description_ar = updates.description.ar;
  }

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return transformProduct(data);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }

  return true;
}

// Initialize storage (no longer needed with Supabase)
export async function initializeStorage(): Promise<void> {
  // This function is kept for compatibility but does nothing
  // Data is now managed by Supabase
  console.log('Storage initialized with Supabase');
}