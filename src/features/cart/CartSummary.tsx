'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export default function CartSummary() {
  const { items, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 sticky top-24">
      <h2 className="font-semibold text-lg text-gray-900">Order Summary</h2>

      <div className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          {shipping === 0 ? (
            <span className="text-primary font-medium">Free</span>
          ) : (
            <span className="font-medium">${shipping.toFixed(2)}</span>
          )}
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Free shipping on orders over $50
          </p>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className={cn(buttonVariants({ size: 'lg' }), 'w-full justify-center')}
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Proceed to Checkout
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>

      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full justify-center')}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
