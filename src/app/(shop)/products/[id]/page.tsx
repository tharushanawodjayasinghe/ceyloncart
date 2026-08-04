import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { getProductById, getProducts } from '@/services/products.service';
import AddToCartButton from './AddToCartButton';
import ProductCard from '@/features/products/ProductCard';
import {
  Package,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: 'Product Not Found | CeylonCart' };
  return {
    title: `${product.name} | CeylonCart`,
    description: product.description,
    openGraph: {
      title: `${product.name} | CeylonCart`,
      description: product.description,
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  // Fetch related products (same category first, fallback to all excluding current)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 pb-4">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/" className="hover:text-primary transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 truncate max-w-40 sm:max-w-xs">{product.name}</span>
        </nav>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-muted-foreground')}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Catalogue
        </Link>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Product Image Gallery container (Left 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-md group">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge variant="secondary" className="bg-white/90 text-gray-900 backdrop-blur-md shadow-sm border-0 font-medium">
                {product.category}
              </Badge>
              <Badge variant="default" className="bg-primary/90 text-white backdrop-blur-md shadow-sm border-0 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Authentic Ceylon
              </Badge>
            </div>
          </div>
        </div>

        {/* Product Info & Actions (Right 6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                ★★★★★ <span className="text-gray-600 text-xs font-normal">(4.9 / 5.0 from 38 ratings)</span>
              </div>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">USD</span>
              <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                Direct Artisan Price
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium pt-1">
              <Package className="w-4 h-4 text-primary shrink-0" />
              <span className={product.stock > 0 ? 'text-emerald-700' : 'text-rose-600'}>
                {product.stock > 10
                  ? `In Stock (${product.stock} units ready to ship)`
                  : product.stock > 0
                  ? `Only ${product.stock} units remaining!`
                  : 'Currently Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Select Quantity & Purchase</h3>
            <AddToCartButton product={product} />
          </div>

          <Separator />

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>100% Authentic Origin</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Free Shipping over $50</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Simulated Safe Payment</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>Handcrafted Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Details */}
      <Card className="border border-gray-100 shadow-2xs">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Product Details & Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-sm">
            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
              <span className="text-xs text-muted-foreground block">Category</span>
              <span className="font-semibold text-gray-900">{product.category}</span>
            </div>
            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
              <span className="text-xs text-muted-foreground block">Origin</span>
              <span className="font-semibold text-gray-900">Sri Lanka (Ceylon)</span>
            </div>
            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
              <span className="text-xs text-muted-foreground block">Stock Available</span>
              <span className="font-semibold text-gray-900">{product.stock} units</span>
            </div>
            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
              <span className="text-xs text-muted-foreground block">Guarantee</span>
              <span className="font-semibold text-gray-900">Artisan Sourced</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
              <p className="text-sm text-muted-foreground">More authentic Sri Lankan products</p>
            </div>
            <Link href="/" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
