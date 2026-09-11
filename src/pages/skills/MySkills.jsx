import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PracticeModal } from '../../components/assessment/PracticeModal';
import {
  BarChart3,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';

export const MySkills = () => {
  const { user } = useAuth();
  const [practiceSkill, setPracticeSkill] = useState(null);

  const skills = user?.skills || [];

  const demonstratedSkills = skills.filter((s) => s.demonstrated);
  const selfDeclaredSkills = skills.filter((s) => !s.demonstrated);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-brand-600" />
          My Skills & Competencies
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your demonstrated skills and identify where to improve to pass the 75% Job Readiness Gate.
        </p>
      </div>

      {/* Concept Callout: Demonstrated vs Self-declared */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white border border-brand-800 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Evidence-Based Skill Profile</span>
        </div>
        <h3 className="text-xl font-extrabold">
          Skills Demonstrated Through Assessments
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Unlike traditional platforms where skills are merely self-declared claims, Corpdoc verifies your capabilities through job-specific assessments. Employers trust scores above 75%.
        </p>
      </div>

      {/* Main Skills Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Demonstrated Skill Scores
          </h2>
          <span className="text-xs text-slate-400">75% = Job Ready Benchmark</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s) => {
            const isReady = s.score >= 75;
            const isWarning = s.score >= 60 && s.score < 75;

            return (
              <div
                key={s.name}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{s.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                      <span>{s.level}</span>
                      {s.demonstrated && (
                        <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`font-mono font-extrabold text-lg ${isReady ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {s.score}%
                  </div>
                </div>

                <ProgressBar
                  value={s.score}
                  threshold={75}
                  color={isReady ? 'success' : isWarning ? 'warning' : 'danger'}
                  height="h-2"
                />

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isReady ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isReady ? "✅ 75% Gate Cleared" : "⚠️ Needs Improvement"}
                  </span>

                  {!isReady && (
                    <Button
                      onClick={() => setPracticeSkill(s.name)}
                      variant="ghost"
                      size="sm"
                      className="text-brand-600 font-bold hover:bg-brand-50"
                    >
                      Practice
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Gaps & Practice Recommendations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Targeted Skill Gaps
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Boosting these specific skills will immediately unlock more job applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">REST API</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  72% Score
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                Improve this skill to increase readiness for both Frontend Developer Intern (ABC Tech) and Full Stack roles.
              </p>
            </div>
            <Button
              onClick={() => setPracticeSkill('REST API')}
              variant="warning"
              size="sm"
              icon={BookOpen}
              className="w-full justify-center font-bold"
            >
              PRACTICE REST API
            </Button>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">Python</span>
                <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  61% Score
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                Score is 14% below the 75% gate for Backend Developer Intern (XYZ Tech). Review data structures and decorators.
              </p>
            </div>
            <Button
              onClick={() => setPracticeSkill('Python')}
              variant="danger"
              size="sm"
              icon={BookOpen}
              className="w-full justify-center font-bold"
            >
              PRACTICE PYTHON
            </Button>
          </div>
        </div>
      </div>

      {/* Practice Sandbox Modal */}
      {practiceSkill && (
        <PracticeModal
          isOpen={!!practiceSkill}
          skillName={practiceSkill}
          onClose={() => setPracticeSkill(null)}
        />
      )}
    </div>
  );
};
