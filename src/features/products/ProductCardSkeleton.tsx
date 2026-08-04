import { Card } from '@/components/ui/card';

// Skeleton card shown while products are loading
export function ProductCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border border-gray-100">
      <div className="aspect-square bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-6 bg-gray-100 rounded animate-pulse w-16" />
          <div className="h-8 bg-gray-100 rounded animate-pulse w-20" />
        </div>
      </div>
    </Card>
  );
}
