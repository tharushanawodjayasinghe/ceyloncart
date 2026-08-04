import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getProductById, getProducts } from '@/services/products.service';
import AddToCartButton from './AddToCartButton';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-6 -ml-2 text-muted-foreground')}>
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center space-y-5">
          <div>
            <Badge variant="secondary" className="mb-3 text-sm">
              {product.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed text-base">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="w-4 h-4 text-primary" />
            <span>
              {product.stock > 10
                ? `In stock (${product.stock} available)`
                : product.stock > 0
                ? `Only ${product.stock} left!`
                : 'Out of stock'}
            </span>
          </div>

          <Separator />

          <AddToCartButton product={product} />

          <p className="text-xs text-muted-foreground">
            🌿 Ethically sourced from Sri Lankan artisans · Free shipping on orders over $50
          </p>
        </div>
      </div>
    </div>
  );
}
