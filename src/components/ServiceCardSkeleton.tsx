import React from 'react';

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between animate-shimmer-dark">
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 animate-pulse" />
        <div className="w-2/3 h-5 bg-slate-800 rounded-lg animate-pulse" />
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-slate-800/80 rounded animate-pulse" />
          <div className="w-5/6 h-3 bg-slate-800/80 rounded animate-pulse" />
        </div>
      </div>
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="w-24 h-3 bg-slate-800 rounded animate-pulse" />
        <div className="w-4 h-4 bg-slate-800 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
