// src/components/ProductCardSkeleton/index.tsx
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <Skeleton className="w-full flex flex-col space-y-4 justify-between p-4 rounded-lg shadow-xl bg-sky-200 dark:bg-slate-800">
      <div className="space-y-2">
        {/* Skeleton instead of product image */}
        <Skeleton className="w-full h-48 rounded-lg bg-white/50 dark:bg-white/20" />

        {/* Two lines of skeleton instead of title */}
        <Skeleton className="h-6 w-3/4 bg-white/50 dark:bg-white/20" />
        <Skeleton className="h-6 w-1/2 bg-white/50 dark:bg-white/20" />
      </div>

      <div className="space-y-4">
        {/* Skeleton instead of price */}
        <Skeleton className="h-6 w-1/4 bg-white/50 dark:bg-white/20" />

        {/* Skeleton instead of button */}
        <Skeleton className="h-10 w-full rounded-lg bg-white/50 dark:bg-white/20" />
      </div>
    </Skeleton>
  );
};

export default ProductCardSkeleton;
