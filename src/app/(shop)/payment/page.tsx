'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import PaymentForm from '@/features/payment/PaymentForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { createClient } from '@/lib/supabase/client';
import type { CartItem, CheckoutFormData } from '@/types';

interface SessionData {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}

// 80% success, 20% failure — pure client-side simulation
function simulatePayment(): boolean {
  return Math.random() < 0.8;
}

export default function PaymentPage() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem('ceyloncart_checkout');
    if (!raw) {
      router.replace('/checkout');
      return;
    }
    try {
      setSessionData(JSON.parse(raw));
    } catch {
      router.replace('/checkout');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handlePayment = async (): Promise<{ success: boolean }> => {
    const success = simulatePayment();

    if (!success) {
      return { success: false };
    }

    // Payment succeeded — create the order in Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.id,
        customerName: sessionData!.name,
        customerEmail: sessionData!.email,
        customerPhone: sessionData!.phone,
        customerAddress: sessionData!.address,
        totalAmount: sessionData!.total,
        items: sessionData!.items.map((item: CartItem) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Order creation failed:', data.error);
      return { success: false };
    }

    // Clear checkout session and cart, then navigate to success
    sessionStorage.removeItem('ceyloncart_checkout');
    localStorage.removeItem('ceyloncart_cart');

    // Dispatch storage event so CartContext picks up the cleared cart
    window.dispatchEvent(new Event('storage'));

    router.push(`/order-success?orderId=${data.orderId}`);
    return { success: true };
  };

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <LoadingSpinner text="Loading payment details…" />
      </div>
    );
  }

  if (!sessionData) return null;

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-muted-foreground">Enter your card details below</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <PaymentForm total={sessionData.total} onSubmit={handlePayment} />
      </div>
    </div>
  );
}
