import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getCategories } from '@/services/products.service';
import ProductGrid from '@/features/products/ProductGrid';
import { ProductCardSkeleton } from '@/features/products/ProductCardSkeleton';

export const metadata: Metadata = {
  title: 'All Products — CeylonCart',
  description: 'Discover authentic Sri Lankan teas, spices, handloom textiles, and traditional crafts.',
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

function ProductGridFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || 'all';

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs & Header */}
        <div className="space-y-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-foreground">Products</span>
          </nav>

          <div className="border-b pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Product Catalog
            </h1>
            <p className="text-muted-foreground mt-2 text-base sm:text-lg">
              Explore {products.length} handpicked authentic Sri Lankan products directly from local artisans and producers.
            </p>
          </div>
        </div>

        {/* Product Catalog Grid with Client Filters */}
        <Suspense fallback={<ProductGridFallback />}>
          <ProductGrid
            products={products}
            categories={categories}
            initialCategory={initialCategory}
          />
        </Suspense>
      </div>
    </div>
  );
}
