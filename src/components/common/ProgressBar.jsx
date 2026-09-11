import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  threshold = 75,
  showThreshold = true,
  height = 'h-2.5',
  color = 'brand', // 'brand' | 'success' | 'danger' | 'warning' | 'dynamic'
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  let barColorClass = "bg-brand-600";
  if (color === 'success' || (color === 'dynamic' && percentage >= threshold)) {
    barColorClass = "bg-emerald-500 shadow-sm shadow-emerald-500/20";
  } else if (color === 'danger' || (color === 'dynamic' && percentage < 50)) {
    barColorClass = "bg-rose-500 shadow-sm shadow-rose-500/20";
  } else if (color === 'warning' || (color === 'dynamic' && percentage < threshold)) {
    barColorClass = "bg-amber-500 shadow-sm shadow-amber-500/20";
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height} border border-slate-200/60`}>
        <div
          className={`${height} rounded-full transition-all duration-700 ease-out ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showThreshold && (
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-slate-800 z-10 opacity-60"
          style={{ left: `${threshold}%` }}
          title={`75% Gate Requirement`}
        >
          <div className="absolute -top-4 -translate-x-1/2 text-[9px] font-bold text-slate-600 bg-white px-1 rounded shadow-xs border border-slate-200">
            75%
          </div>
        </div>
      )}
    </div>
  );
};
