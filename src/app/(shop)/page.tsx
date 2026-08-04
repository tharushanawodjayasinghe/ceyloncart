import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getCategories } from '@/services/products.service';
import ProductGrid from './ProductGrid';

export const metadata: Metadata = {
  title: 'CeylonCart — Authentic Sri Lankan Products',
  description: 'Discover premium Ceylon teas, spices, handloom textiles, and traditional Sri Lankan crafts.',
};

// ProductGrid with category filter logic (client-side filtered)
export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium mb-4">
              🌿 Authentic Sri Lankan Products
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              The Finest from{' '}
              <span className="text-primary">Ceylon</span>,
              <br />delivered to you.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Shop premium teas, exotic spices, handloom textiles, and traditional crafts —
              all ethically sourced from Sri Lanka&apos;s finest artisans.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {['🫖 Premium Teas', '🌶️ Exotic Spices', '🎨 Handmade Crafts', '🛁 Free Shipping $50+'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalogue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
          <p className="text-muted-foreground mt-1">
            {products.length} authentic Sri Lankan products
          </p>
        </div>
        <Suspense fallback={<div className="text-muted-foreground text-sm">Loading products…</div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </section>
    </div>
  );
}
