// components/RoomSkeleton.tsx
import { Skeleton } from '@nextui-org/react';

export const RoomSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-8 w-3/5 rounded-lg" />
    <Skeleton className="h-6 w-4/5 rounded-lg" />
    <Skeleton className="h-6 w-2/5 rounded-lg" />
    <Skeleton className="h-6 w-2/5 rounded-lg" />
    <Skeleton className="h-8 w-3/5 rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-4/5 rounded-lg" />
      <Skeleton className="h-4 w-3/5 rounded-lg" />
      <Skeleton className="h-4 w-2/5 rounded-lg" />
    </div>
    <Skeleton className="h-10 w-40 rounded-lg" />
  </div>
);
