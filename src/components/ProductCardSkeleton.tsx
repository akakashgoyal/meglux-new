import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden shadow-md flex-1">
      {/* Image Skeleton */}
      <div className="relative h-56 sm:h-64 w-full bg-slate-200 animate-shimmer overflow-hidden">
        {/* Placeholder Pill */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div className="w-24 h-5 rounded-md bg-slate-300/80 animate-pulse" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title Placeholder */}
          <div className="h-5 bg-slate-200 rounded-lg w-3/4 animate-pulse" />

          {/* Description Lines */}
          <div className="space-y-2">
            <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
            <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex-1 h-9 rounded-xl bg-slate-100 animate-pulse" />
          <div className="flex-1 h-9 rounded-xl bg-[#FFE500]/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
