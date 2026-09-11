import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { ScoreGauge } from '../../components/common/ScoreGauge';
import { SkillBreakdown } from '../../components/assessment/SkillBreakdown';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  History,
  Briefcase
} from 'lucide-react';

export const AssessmentResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { getLatestAttempt, getJobAttempts, getBestScore, isJobEligible } = useAssessment();

  const job = getJobById(id);
  const latestAttempt = getLatestAttempt(id);
  const attempts = getJobAttempts(id);
  const bestScore = getBestScore(id);
  const isEligible = isJobEligible(id);

  // Trigger celebratory confetti on passing 75% gate
  useEffect(() => {
    if (latestAttempt?.isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [latestAttempt]);

  if (!job || !latestAttempt) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Assessment Found</h2>
        <Button onClick={() => navigate(`/jobs/${id || ''}`)} variant="secondary">
          Back to Job
        </Button>
      </div>
    );
  }

  const isPassed = latestAttempt.isPassed;
  const score = latestAttempt.score;
  const diff = 75 - score;

  const handleRetake = () => {
    navigate(`/jobs/${job.id}/readiness/test`);
  };

  const handleApplyNow = () => {
    navigate(`/jobs/${job.id}/apply`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Top Banner Status Header */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
          isPassed
            ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border-emerald-500/30'
            : 'bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white border-rose-500/30'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isPassed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {isPassed ? <Sparkles className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              <span>{isPassed ? "75% Gate Cleared" : "75% Gate Not Reached"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {isPassed ? "🎉 YOU'RE READY!" : "❌ NOT ELIGIBLE YET"}
            </h1>

            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              {isPassed ? (
                <>
                  You scored <strong className="text-emerald-400 font-bold">{score}%</strong> (minimum 75% required). You have demonstrated the minimum readiness required for <strong>{job.title}</strong> at {job.company}.
                </>
              ) : (
                <>
                  You scored <strong className="text-rose-400 font-bold">{score}%</strong> (minimum 75% required). Once you reach 75%, you'll be able to apply for this job.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
              <div
                className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  isPassed
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}
              >
                <span>Status: {isPassed ? "✅ Eligible to Apply" : `❌ Needs +${diff}% score improvement`}</span>
              </div>

              <span className="text-xs text-slate-400">
                Attempt #{latestAttempt.attemptNumber} • {latestAttempt.takenAt}
              </span>
            </div>
          </div>

          {/* Radial Score Gauge */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex-shrink-0">
            <ScoreGauge score={score} threshold={75} size={150} showLabel={false} />
          </div>
        </div>
      </div>

      {/* Main Action CTAs */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            {isPassed ? "Application Gate Unlocked" : "Retake Readiness Assessment"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isPassed
              ? "Your readiness score has been verified and attached to your application."
              : "Unlimited attempts are available. New score updates your verified record."}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={handleRetake}
            variant="secondary"
            size="md"
            icon={RotateCcw}
            className="w-full sm:w-auto font-bold"
          >
            {isPassed ? "Retake for Higher Score" : "RETAKE TEST"}
          </Button>

          {isPassed && (
            <Button
              onClick={handleApplyNow}
              variant="glow"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto font-extrabold px-8 bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              APPLY NOW
            </Button>
          )}
        </div>
      </div>

      {/* Skill Performance Breakdown & Gap Diagnostics */}
      <SkillBreakdown
        skillBreakdown={latestAttempt.skillBreakdown}
        weakestSkill={latestAttempt.weakestSkill}
        isPassed={isPassed}
      />

      {/* Assessment History / Retakes Timeline */}
      {attempts.length > 1 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              Assessment Attempt History
            </h4>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
              Best Score: <strong className="text-emerald-600">{bestScore}%</strong>
            </span>
          </div>

          <div className="space-y-2.5">
            {attempts.map((att, idx) => (
              <div
                key={att.id || idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  att.isPassed
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                    att.isPassed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    #{att.attemptNumber || idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">
                      Attempt {att.attemptNumber || idx + 1}
                    </div>
                    <div className="text-[11px] text-slate-500">{att.takenAt}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold text-sm ${att.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {att.score}% {att.isPassed ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
