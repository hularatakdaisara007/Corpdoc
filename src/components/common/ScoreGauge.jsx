import React from 'react';

export const ScoreGauge = ({
  score = 0,
  threshold = 75,
  size = 180,
  strokeWidth = 12,
  showLabel = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const isPassed = score >= threshold;
  
  // Arc calculation for radial gauge
  const progressOffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  const color = isPassed
    ? {
        stroke: "#10b981", // emerald-500
        bg: "text-emerald-500",
        glow: "rgba(16, 185, 129, 0.25)",
        badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200"
      }
    : score >= 65
    ? {
        stroke: "#f59e0b", // amber-500
        bg: "text-amber-500",
        glow: "rgba(245, 158, 11, 0.25)",
        badgeBg: "bg-amber-50 text-amber-800 border-amber-200"
      }
    : {
        stroke: "#f43f5e", // rose-500
        bg: "text-rose-500",
        glow: "rgba(244, 63, 94, 0.25)",
        badgeBg: "bg-rose-50 text-rose-800 border-rose-200"
      };

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          {/* 75% Gate marker line */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#94a3b8"
            strokeWidth={strokeWidth + 2}
            strokeDasharray={`2 ${circumference - 2}`}
            strokeDashoffset={circumference - (threshold / 100) * circumference}
            className="opacity-75"
          />
          {/* Animated score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${color.glow})`
            }}
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            {score}%
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Your Score
          </span>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            <span>Gate: {threshold}%</span>
          </div>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 flex items-center justify-center">
          {isPassed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 animate-fade-in">
              <span>✅ 75% Gate Passed (Eligible)</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 animate-fade-in">
              <span>❌ Not Eligible Yet ({threshold - score}% needed)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
