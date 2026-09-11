import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { ScoreGauge } from '../common/ScoreGauge';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

export const ReadinessGateCard = ({ job, bestScore, latestAttempt, isEligible }) => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate(`/jobs/${job.id}/readiness`);
  };

  const handleApplyNow = () => {
    navigate(`/jobs/${job.id}/apply`);
  };

  const handleViewResult = () => {
    navigate(`/jobs/${job.id}/readiness/result`);
  };

  // State A: Student has passed the 75% Readiness Gate
  if (isEligible) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle glowing background orb */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>75% Readiness Gate Cleared</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              🎉 READINESS VERIFIED
            </h3>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              You scored <span className="font-bold text-emerald-400 text-base">{bestScore}%</span> on the job-specific assessment (minimum required: 75%). You have successfully demonstrated the core competencies required for this role.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Job Eligibility: <strong className="text-emerald-400 font-bold">ACTIVE</strong></span>
              </div>
              <div className="text-xs text-slate-400">
                Best Score: <strong className="text-white">{bestScore}%</strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
            <Button
              onClick={handleApplyNow}
              variant="glow"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full justify-center bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/30 font-extrabold text-base"
            >
              APPLY NOW
            </Button>

            <Button
              onClick={handleViewResult}
              variant="secondary"
              size="md"
              icon={FileCheck2}
              className="w-full justify-center bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700"
            >
              View Assessment Breakdown
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // State B: Student has attempted but scored below 75%
  if (latestAttempt && !isEligible) {
    return (
      <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Score: {latestAttempt.score}% — Below 75% Gate</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              🔒 75% JOB READINESS GATE
            </h3>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Your latest score is <strong className="text-rose-400">{latestAttempt.score}%</strong>. Application remains locked until you score at least <strong className="text-white">75%</strong>.
              Review your weak area (<strong className="text-amber-300">{latestAttempt.weakestSkill}</strong>) and retake the test.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Gap: Need +{75 - latestAttempt.score}% to unlock application</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
            <Button
              onClick={handleStartTest}
              variant="glow"
              size="lg"
              icon={RotateCcw}
              className="w-full justify-center bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 font-extrabold text-base"
            >
              RETAKE ASSESSMENT
            </Button>

            <Button
              onClick={handleViewResult}
              variant="secondary"
              size="md"
              className="w-full justify-center bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700"
            >
              View Skill Gaps & Tips
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // State C: Assessment not taken yet (Default state)
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-brand-400" />
            <span>Mandatory Pre-Application Standard</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            🔒 75% JOB READINESS GATE
          </h3>

          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Before applying, you must demonstrate at least <strong className="text-white">75% readiness</strong> for this specific role. The assessment is dynamically tailored to the skills required for this job ({job.requiredSkills.join(', ')}).
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
              <span>10 Questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
              <span>~10 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Pass Score: 75%</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2.5 w-full md:w-auto flex-shrink-0">
          <Button
            onClick={handleStartTest}
            variant="glow"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full justify-center font-extrabold text-base px-8 py-3.5"
          >
            TAKE READINESS TEST
          </Button>
          <p className="text-[11px] text-center text-slate-400">
            "Apply Now" unlocks immediately on scoring ≥ 75%
          </p>
        </div>
      </div>
    </div>
  );
};
