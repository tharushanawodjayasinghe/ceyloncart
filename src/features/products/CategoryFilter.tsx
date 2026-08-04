'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const allCategories = ['all', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(cat)}
          className={cn(
            'rounded-full capitalize transition-all',
            selected === cat
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'text-gray-600 hover:text-primary hover:border-primary'
          )}
        >
          {cat === 'all' ? 'All Products' : cat}
        </Button>
      ))}
    </div>
  );
}
