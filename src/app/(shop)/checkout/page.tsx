import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import CheckoutForm from '@/features/checkout/CheckoutForm';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = { title: 'Checkout' };

export default async function CheckoutPage() {
  // Auth guard — redirect to login if not signed in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?returnUrl=/checkout');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Secure checkout
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
