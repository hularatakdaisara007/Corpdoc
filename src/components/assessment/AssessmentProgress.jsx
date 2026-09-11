import React from 'react';
import { ProgressBar } from '../common/ProgressBar';

export const AssessmentProgress = ({
  currentIndex = 0,
  totalQuestions = 10,
  answeredCount = 0
}) => {
  const currentNumber = currentIndex + 1;
  const progressPercent = Math.round((currentNumber / totalQuestions) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span className="text-slate-800">
          Question <strong className="text-brand-600 text-sm">{currentNumber}</strong> of {totalQuestions}
        </span>
        <span>
          Answered: <strong className="text-slate-900">{answeredCount}</strong> / {totalQuestions}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
        <div
          className="bg-brand-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
