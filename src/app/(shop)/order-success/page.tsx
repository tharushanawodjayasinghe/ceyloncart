'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ShoppingBag, Package } from 'lucide-react';
import OrderConfirmation from '@/features/orders/OrderConfirmation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.replace('/');
      return;
    }

    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <LoadingSpinner text="Loading your order…" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-muted-foreground">Could not load order details.</p>
        <Link href="/" className={cn(buttonVariants())}>Go Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <OrderConfirmation order={order} />

      <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-2xl mx-auto">
        <Link href="/" className={cn(buttonVariants(), 'flex-1 justify-center inline-flex items-center')}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <Link href="/orders" className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 justify-center inline-flex items-center')}>
          <Package className="w-4 h-4 mr-2" />
          View All Orders
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-96 flex items-center justify-center">
          <LoadingSpinner text="Loading order..." />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
