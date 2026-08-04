'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      {/* Quantity selector */}
      <div className="flex items-center justify-between sm:justify-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-1.5 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleDecrease}
          disabled={quantity <= 1 || product.stock === 0}
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="font-semibold text-sm w-8 text-center select-none">
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleIncrease}
          disabled={quantity >= product.stock || product.stock === 0}
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Add to Cart button */}
      <Button
        size="lg"
        className="flex-1 h-12 text-base font-semibold transition-all shadow-sm"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {added ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Added {quantity} to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : `Add ${quantity > 1 ? `(${quantity}) ` : ''}to Cart`}
          </>
        )}
      </Button>
    </div>
  );
}
