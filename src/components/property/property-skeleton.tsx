import { Skeleton } from "@/components/ui/skeleton";

const HEIGHTS = [260, 320, 220, 360, 280, 300];

export function PropertyCardSkeleton({ index = 0 }: { index?: number }) {
  const h = HEIGHTS[index % HEIGHTS.length];
  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-border/50">
      <Skeleton className="w-full" style={{ height: `${h}px` }} />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
