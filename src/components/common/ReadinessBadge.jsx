import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ReadinessBadge = ({
  score = null,
  requiredScore = 75,
  size = 'md',
  showThreshold = true,
  className = ''
}) => {
  // Case 1: No assessment taken yet
  if (score === null || score === undefined) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold ${className}`}>
        <Lock className="w-3.5 h-3.5 text-slate-500" />
        <span>🔒 {requiredScore}% Readiness Required</span>
      </div>
    );
  }

  const isPassed = score >= requiredScore;
  const isClose = !isPassed && score >= 65;

  if (isPassed) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm shadow-emerald-500/10 text-xs font-bold ${className}`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Your Readiness: {score}%</span>
        <span className="text-emerald-600">✅</span>
        {showThreshold && <span className="text-emerald-700 font-normal">({requiredScore}% Req)</span>}
      </div>
    );
  }

  if (isClose) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 shadow-sm shadow-amber-500/10 text-xs font-bold ${className}`}>
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>Your Readiness: {score}%</span>
        <span className="text-amber-600">⚠️</span>
        {showThreshold && <span className="text-amber-700 font-normal">({requiredScore}% Req)</span>}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-300 shadow-sm shadow-rose-500/10 text-xs font-bold ${className}`}>
      <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
      <span>Your Readiness: {score}%</span>
      <span className="text-rose-600">❌</span>
      {showThreshold && <span className="text-rose-700 font-normal">({requiredScore}% Req)</span>}
    </div>
  );
};
