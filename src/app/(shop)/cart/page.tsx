'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import CartItem from '@/features/cart/CartItem';
import CartSummary from '@/features/cart/CartSummary';
import EmptyState from '@/components/shared/EmptyState';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {items.length === 0
              ? 'Your cart is empty'
              : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add some authentic Sri Lankan products to get started."
          className="py-24"
          action={
            <Link href="/" className={cn(buttonVariants(), 'inline-flex items-center gap-2')}>
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
