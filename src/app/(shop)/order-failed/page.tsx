import Link from 'next/link';
import { XCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Payment Failed' };

export default function OrderFailedPage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-5">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-11 h-11 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Payment Declined</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your payment could not be processed. This is a simulated failure —
            no charges were made to your card.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 text-left space-y-1">
          <p className="font-medium">Common reasons for failure:</p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-700">
            <li>Insufficient funds</li>
            <li>Card details entered incorrectly</li>
            <li>Card expired</li>
            <li>Bank declined the transaction</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/payment" className={cn(buttonVariants(), 'flex-1 justify-center inline-flex items-center')}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 justify-center inline-flex items-center')}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
