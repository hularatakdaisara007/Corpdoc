import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';

export const ApplicationTimeline = ({ timeline = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-slate-900">
          Application Progress Timeline
        </h4>
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
          Standard 5-Stage Hiring Cycle
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-200">
        {timeline.map((step, index) => {
          const isDone = step.completed;
          const isCurrent = step.current;

          return (
            <div key={index} className="relative flex items-start gap-4 group">
              {/* Stepper Node */}
              <div
                className={`absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 ring-4 ring-emerald-50'
                    : isCurrent
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30 ring-4 ring-brand-50 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Circle className="w-2.5 h-2.5 fill-current" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isCurrent ? 'text-brand-600' : isDone ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.step}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                        Current Status
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{step.date}</span>
                </div>
                {step.note && (
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
