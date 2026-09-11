import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ReadinessBadge } from '../../components/common/ReadinessBadge';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Building2,
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  CheckCircle2,
  Globe,
  ExternalLink
} from 'lucide-react';

export const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { getBestScore, getLatestAttempt, isJobEligible } = useAssessment();
  const { submitApplication } = useApplications();
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const job = getJobById(id);
  const bestScore = getBestScore(id);
  const latestAttempt = getLatestAttempt(id);
  const isEligible = isJobEligible(id);

  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Team at ${job?.company || 'the Company'},\n\nI am writing to express my strong enthusiasm for the ${job?.title || 'position'}. Having demonstrated a verified ${bestScore || 82}% readiness score on the Corpdoc job-specific assessment, I possess practical foundations in ${job?.requiredSkills?.slice(0, 3)?.join(', ') || 'the required technologies'}.\n\nI look forward to discussing how I can immediately contribute to your product initiatives.`
  );
  const [portfolioUrl, setPortfolioUrl] = useState(user?.links?.portfolio || 'https://ayushjain.dev');
  const [resumeFileName, setResumeFileName] = useState(user?.resume?.fileName || 'Ayush_Jain_Resume.pdf');
  const [submitting, setSubmitting] = useState(false);

  if (!job) {
    return <div className="text-center py-16">Job not found</div>;
  }

  // Strict 75% Gate Guard
  if (!isEligible) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Application Locked
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
            75% Job Readiness Required
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
            You cannot apply directly to {job.title}. Every applicant must first demonstrate at least 75% readiness on the job-specific assessment.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs space-y-2">
          <div className="flex justify-between">
            <span>Your Current Score:</span>
            <strong className="text-rose-600">{bestScore || 0}%</strong>
          </div>
          <div className="flex justify-between">
            <span>Minimum Gate:</span>
            <strong className="text-slate-900">75%</strong>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => navigate(`/jobs/${job.id}`)} variant="secondary">
            Back to Job
          </Button>
          <Button onClick={() => navigate(`/jobs/${job.id}/readiness`)} variant="glow" icon={ArrowRight} iconPosition="right">
            Take Readiness Test
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const newApp = submitApplication({
        job,
        readinessScore: bestScore,
        coverLetter,
        resumeFileName,
        portfolioUrl,
        skillPerformance: latestAttempt?.skillBreakdown || []
      });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      showToast({
        title: "Application Submitted! 🎉",
        message: `Applied for ${job.title} at ${job.company} with ${bestScore}% verified readiness.`,
        type: "success"
      });

      setSubmitting(false);
      navigate(`/jobs/${job.id}/apply/success`, { state: { application: newApp } });
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Back Link */}
      <button
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Job Details</span>
      </button>

      {/* Main Application Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-8">
        {/* Header */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified Candidate Application
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Apply for {job.title}
          </h1>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{job.company}</span>
            <span className="text-slate-300">•</span>
            <span>{job.location}</span>
          </div>
        </div>

        {/* 75% Gate Cleared Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-emerald-950 font-bold block mb-0.5">
              You are eligible to apply!
            </strong>
            You demonstrated a verified <strong>{bestScore}% readiness score</strong> (required: 75%). Your readiness report and skill-level breakdown will be sent directly to the hiring team.
          </div>
        </div>

        <form onSubmit={handleSubmitApplication} className="space-y-6">
          {/* Resume Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Attached Resume
            </label>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{resumeFileName}</div>
                  <div className="text-[11px] text-slate-500">PDF • Verified Profile Resume</div>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setResumeFileName("Ayush_Jain_Resume_v2.pdf")}
              >
                Change Resume
              </Button>
            </div>
          </div>

          {/* Cover Letter Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Cover Letter
              </label>
              <span className="text-xs text-slate-400">Personalize your pitch</span>
            </div>
            <textarea
              rows={5}
              required
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          {/* Portfolio Link */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Portfolio / GitHub URL (Optional)
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.dev"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Verified Assessment Attachment Notice */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Corpdoc Assessment Score ({bestScore}%) will be automatically attached.</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button
              type="button"
              onClick={() => navigate(`/jobs/${job.id}`)}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="glow"
              size="lg"
              loading={submitting}
              className="font-extrabold text-base px-8 bg-gradient-to-r from-emerald-600 to-teal-600"
            >
              SUBMIT APPLICATION
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
