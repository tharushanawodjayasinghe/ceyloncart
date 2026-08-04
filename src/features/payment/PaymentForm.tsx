'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PaymentFormProps {
  total: number;
  onSubmit: () => Promise<{ success: boolean }>;
}

// Format card number with spaces every 4 digits
function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

// Format expiry as MM/YY
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function PaymentForm({ total, onSubmit }: PaymentFormProps) {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length >= 2 &&
    expiry.length === 5 &&
    cvv.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isProcessing) return;

    setIsProcessing(true);
    toast.loading('Processing payment…', { id: 'payment' });

    // Simulate network delay (1–2 seconds for realism)
    await new Promise((r) => setTimeout(r, 1500));

    const result = await onSubmit();
    toast.dismiss('payment');

    if (result.success) {
      toast.success('Payment successful!');
    } else {
      setIsProcessing(false);
      toast.error('Payment declined. Please try again.');
      router.push('/order-failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Secure badge */}
      <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2.5">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-gray-700">Simulated payment</span> — no real charges will be made
        </span>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div className="space-y-1.5">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="pl-10 font-mono tracking-wider"
              maxLength={19}
              inputMode="numeric"
              autoComplete="cc-number"
            />
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="space-y-1.5">
          <Label htmlFor="card-name">Cardholder Name</Label>
          <Input
            id="card-name"
            placeholder="KASUN PERERA"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="uppercase font-mono tracking-wide"
            maxLength={26}
            autoComplete="cc-name"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="card-expiry">Expiry Date</Label>
            <Input
              id="card-expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className="font-mono"
              maxLength={5}
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="card-cvv">CVV</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                id="card-cvv"
                placeholder="•••"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="pl-9 font-mono"
                maxLength={4}
                inputMode="numeric"
                autoComplete="cc-csc"
                type="password"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Total + Pay button */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between items-center text-base font-bold">
          <span>Total to Pay</span>
          <span className="text-primary text-xl">${total.toFixed(2)}</span>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isFormValid || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay ${total.toFixed(2)}
            </>
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          80% simulated success · 20% simulated failure
        </p>
      </div>
    </form>
  );
}
