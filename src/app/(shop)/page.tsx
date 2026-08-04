import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getCategories } from '@/services/products.service';
import ProductGrid from './ProductGrid';
import HeroCarousel from '@/components/layout/HeroCarousel';

export const metadata: Metadata = {
  title: 'CeylonCart — Authentic Sri Lankan Products',
  description: 'Discover premium Ceylon teas, spices, handloom textiles, and traditional Sri Lankan crafts.',
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Full Background Image Hero Carousel */}
      <HeroCarousel />

      {/* Product Catalogue */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Products</h2>
          <p className="text-muted-foreground mt-1">
            Explore {products.length} authentic Sri Lankan products
          </p>
        </div>
        <Suspense fallback={<div className="text-muted-foreground text-sm">Loading products…</div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </section>
    </div>
  );
}
