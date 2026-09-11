import React from 'react';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

export const AssessmentQuestion = ({
  question,
  selectedAnswer,
  onSelectOption
}) => {
  return (
    <div className="space-y-6">
      {/* Question Header & Type Badge */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            {question.skill}
          </span>
          {question.type === 'scenario' && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-500" />
              Scenario-based
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.id;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <div
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4 select-none ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 shadow-md shadow-brand-500/10'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              {/* Option Radio / Circle */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : letter}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-0.5">
                <p className={`text-sm sm:text-base ${isSelected ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                  {option.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
