'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { checkoutSchema, type CheckoutFormValues } from '@/lib/validations/checkout.schema';
import { useCart } from '@/context/CartContext';

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Store checkout data in sessionStorage so the payment page can access it
    sessionStorage.setItem('ceyloncart_checkout', JSON.stringify({
      ...data,
      items,
      total,
    }));
    router.push('/payment');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-semibold text-lg text-gray-900">Customer Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="checkout-name">Full Name</Label>
            <Input
              id="checkout-name"
              placeholder="e.g. Kasun Perera"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="checkout-email">Email Address</Label>
            <Input
              id="checkout-email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="checkout-phone">Phone Number</Label>
            <Input
              id="checkout-phone"
              type="tel"
              placeholder="+94 77 123 4567"
              {...register('phone')}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="checkout-address">Delivery Address</Label>
            <Textarea
              id="checkout-address"
              placeholder="No. 12, Temple Road, Colombo 03, Sri Lanka"
              rows={3}
              {...register('address')}
              className={errors.address ? 'border-destructive' : ''}
            />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
        <h2 className="font-semibold text-gray-900">Order Summary</h2>
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <ArrowRight className="w-4 h-4 mr-2" />
        )}
        {isSubmitting ? 'Processing...' : 'Continue to Payment'}
      </Button>
    </form>
  );
}
