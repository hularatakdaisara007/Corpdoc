import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`bg-slate-200/80 rounded-lg animate-shimmer ${className}`} />
  );
};

export const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="w-44 h-5" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
        <Skeleton className="w-24 h-6 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-20 h-4" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="w-36 h-6 rounded-full" />
        <Skeleton className="w-28 h-9 rounded-xl" />
      </div>
    </div>
  );
};
