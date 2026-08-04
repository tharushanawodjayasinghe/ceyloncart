import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/services/products.service';

// GET /api/products?category=Tea%20%26%20Beverages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;

    const products = await getProducts(category);
    return NextResponse.json({ products });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
