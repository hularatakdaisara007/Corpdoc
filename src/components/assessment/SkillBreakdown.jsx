import React, { useState } from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { PracticeModal } from './PracticeModal';
import {
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const SkillBreakdown = ({
  skillBreakdown = [],
  weakestSkill = '',
  isPassed = false,
  onImproveClick
}) => {
  const [selectedPracticeSkill, setSelectedPracticeSkill] = useState(null);

  const handleOpenPractice = (skillName) => {
    setSelectedPracticeSkill(skillName || weakestSkill || 'REST API');
  };

  return (
    <div className="space-y-6">
      {/* Skill-by-skill Score Bars */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            Skill-Level Performance
          </h4>
          <span className="text-xs text-slate-400">Evaluated on actual job requirements</span>
        </div>

        <div className="space-y-3.5 pt-2">
          {skillBreakdown.map((item) => {
            const isSkillGood = item.score >= 75;
            const isSkillWarn = item.score >= 50 && item.score < 75;
            const isSkillCrit = item.score < 50;

            return (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span>{item.skill}</span>
                    {isSkillGood ? (
                      <span className="text-emerald-600 font-normal">✓ Good</span>
                    ) : isSkillCrit ? (
                      <span className="text-rose-600 font-semibold flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> Critical Gap
                      </span>
                    ) : (
                      <span className="text-amber-600 font-normal">⚠️ Needs Improvement</span>
                    )}
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    {item.score}%
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      isSkillGood
                        ? 'bg-emerald-500'
                        : isSkillCrit
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weakest Skill & How to Improve Card (Crucial for Failed / Needs Improvement state) */}
      {!isPassed && weakestSkill && (
        <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Your Biggest Skill Gap
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {weakestSkill}
                </h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Focusing on <strong>{weakestSkill}</strong> fundamentals and practicing exercises will give you the quickest score boost to cross the 75% gate on your retake.
                </p>
              </div>
            </div>

            <Button
              onClick={() => handleOpenPractice(weakestSkill)}
              variant="warning"
              size="sm"
              icon={BookOpen}
              className="flex-shrink-0 font-bold"
            >
              IMPROVE SKILLS
            </Button>
          </div>

          <div className="pt-3 border-t border-amber-200/60">
            <div className="text-xs font-bold text-slate-800 mb-2">
              Action Plan to Cross 75%:
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li>Review HTTP request verbs, status codes, and idempotency headers.</li>
              <li>Complete 2-3 interactive mock API calls and error boundary tests.</li>
              <li>Retake the assessment once you feel confident with the concepts.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Practice / Improvement Sandbox Modal */}
      {selectedPracticeSkill && (
        <PracticeModal
          isOpen={!!selectedPracticeSkill}
          skillName={selectedPracticeSkill}
          onClose={() => setSelectedPracticeSkill(null)}
        />
      )}
    </div>
  );
};
