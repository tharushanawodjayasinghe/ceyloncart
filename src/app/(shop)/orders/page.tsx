import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getUserOrders } from '@/services/orders.service';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Package, ShoppingBag, CheckCircle2 } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'My Orders' };

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?returnUrl=/orders');

  const orders = await getUserOrders();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-muted-foreground mt-1">
          {orders.length} order{orders.length !== 1 ? 's' : ''} placed
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Place your first order to see it here."
          action={
            <Link href="/" className={cn(buttonVariants(), 'inline-flex items-center gap-2')}>
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="font-mono font-bold text-primary">{order.order_number}</span>
                    <Badge
                      variant={order.status === 'confirmed' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {order.status === 'confirmed' ? (
                        <><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</>
                      ) : 'Failed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.created_at).toLocaleDateString('en-LK', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  ${order.total_amount.toFixed(2)}
                </span>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div className="border-t pt-3 space-y-1.5">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product_name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.unit_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
