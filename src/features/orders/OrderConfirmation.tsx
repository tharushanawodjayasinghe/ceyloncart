import { CheckCircle2, Package, MapPin, Phone, Mail, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';

interface OrderConfirmationProps {
  order: Order;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const formattedDate = new Date(order.created_at).toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success banner */}
      <div className="text-center space-y-3 py-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed! 🎉</h1>
          <p className="text-muted-foreground mt-1">
            Thank you for shopping with CeylonCart. Your order is on its way!
          </p>
        </div>
        <Badge variant="secondary" className="text-base px-4 py-1.5 font-mono font-bold text-primary">
          {order.order_number}
        </Badge>
        <p className="text-xs text-muted-foreground">Placed on {formattedDate}</p>
      </div>

      {/* Customer info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          Delivery Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">{order.customer_name}</p>
              <p className="text-muted-foreground">{order.customer_email}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{order.customer_phone}</p>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{order.customer_address}</p>
          </div>
        </div>
      </div>

      {/* Order items */}
      {order.order_items && order.order_items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            Items Ordered
          </h2>
          <div className="space-y-3">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-900">{item.product_name}</p>
                  <p className="text-muted-foreground">
                    ${item.unit_price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  ${(item.unit_price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-base">
            <span>Grand Total</span>
            <span className="text-primary">${order.total_amount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
