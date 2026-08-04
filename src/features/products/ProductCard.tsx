'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Don't navigate to product page
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        {/* Footer with price and CTA */}
        <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="shrink-0"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Add
          </Button>
        </CardFooter>

      </Card>
    </Link>
  );
}
