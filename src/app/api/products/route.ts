import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/services/products.service';
import { categoryQuerySchema } from '@/lib/validations/api.schema';

// GET /api/products?category=Tea%20%26%20Beverages — Read-only public product list with query validation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get('category') ?? undefined;

    // Validate category query string length/format
    const categoryResult = categoryQuerySchema.safeParse(rawCategory);
    const category = categoryResult.success ? categoryResult.data : undefined;

    const products = await getProducts(category);
    return NextResponse.json({ products });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
