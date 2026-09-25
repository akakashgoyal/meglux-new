import React from 'react';

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-44 sm:h-52 bg-slate-200 animate-shimmer flex flex-col justify-end p-4 sm:p-5 shadow-sm">
      <div className="relative z-10 space-y-2">
        <div className="w-20 h-4 bg-slate-300 rounded animate-pulse" />
        <div className="w-3/4 h-5 bg-slate-300 rounded-lg animate-pulse" />
        <div className="w-1/2 h-3 bg-slate-300/80 rounded animate-pulse hidden sm:block" />
      </div>
    </div>
  );
};
