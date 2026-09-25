import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between">
      <div className="h-52 w-full bg-slate-200 animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
        <div className="w-3/4 h-5 bg-slate-200 rounded-lg animate-pulse" />
        <div className="w-full h-3 bg-slate-100 rounded animate-pulse" />
        <div className="w-4/5 h-3 bg-slate-100 rounded animate-pulse" />
      </div>
      <div className="p-5 pt-0">
        <div className="h-9 w-full bg-slate-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
};
