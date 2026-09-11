import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { Button } from '../../components/common/Button';
import {
  ShieldCheck,
  Clock,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const ReadinessIntro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { getJobAttempts, getBestScore } = useAssessment();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="text-center py-16">
        <p>Job not found</p>
        <Button onClick={() => navigate('/jobs')} variant="secondary" className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  const attempts = getJobAttempts(job.id);
  const bestScore = getBestScore(job.id);

  const handleStartTest = () => {
    navigate(`/jobs/${job.id}/readiness/test`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in py-4">
      {/* Back Link */}
      <button
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Job Details</span>
      </button>

      {/* Main Intro Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 border border-brand-200/60 mx-auto flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Job-Specific Assessment
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {job.title} Readiness Assessment
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
              This assessment evaluates your readiness for this specific job at <strong>{job.company}</strong>.
            </p>
          </div>
        </div>

        {/* 75% Gate Critical Rule Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-amber-950 font-bold text-sm block mb-0.5">
              Mandatory 75% Readiness Benchmark
            </strong>
            You must score <strong>75% or higher</strong> to unlock the <strong>"Apply Now"</strong> button. If you score below 75%, you will receive detailed skill gap insights and unlimited opportunities to improve and retake.
          </div>
        </div>

        {/* Evaluated Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Skills Evaluated in This Test
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {job.requiredSkills.map((skill) => (
              <div
                key={skill}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-bold text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Parameters Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">10</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Questions</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">10 Min</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Time Limit</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-600">75%</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Passing Gate</div>
          </div>
        </div>

        {/* Previous Attempts (if any) */}
        {attempts.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800">Previous Attempts: </span>
              <span className="text-slate-600">{attempts.length} attempts taken</span>
            </div>
            <div>
              <span className="font-bold text-slate-800">Current Best Score: </span>
              <strong className={bestScore >= 75 ? 'text-emerald-600' : 'text-rose-600'}>
                {bestScore}% {bestScore >= 75 ? '✅' : '❌'}
              </strong>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={() => navigate(`/jobs/${job.id}`)}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            onClick={handleStartTest}
            variant="glow"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto font-extrabold text-base px-8"
          >
            START ASSESSMENT
          </Button>
        </div>
      </div>
    </div>
  );
};
