import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types';

// Fetch all products, optionally filtered by category
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch products:', error.message);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error('Error in getProducts service:', err);
    return [];
  }
}

// Fetch a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Failed to fetch product:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error in getProductById service:', err);
    return null;
  }
}

// Fetch all unique product categories
export async function getCategories(): Promise<string[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) {
      console.error('Failed to fetch categories:', error.message);
      return [];
    }

    const categories = [...new Set(data.map((p) => p.category))];
    return categories.sort();
  } catch (err) {
    console.error('Error in getCategories service:', err);
    return [];
  }
}
