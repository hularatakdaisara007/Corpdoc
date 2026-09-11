import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { ReadinessGateCard } from '../../components/jobs/ReadinessGateCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ReadinessBadge } from '../../components/common/ReadinessBadge';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Users,
  ShieldCheck,
  Lock,
  Sparkles
} from 'lucide-react';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { getBestScore, getLatestAttempt, isJobEligible } = useAssessment();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Job Not Found</h2>
        <Button onClick={() => navigate('/jobs')} variant="secondary" icon={ArrowLeft}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  const bestScore = getBestScore(job.id);
  const latestAttempt = getLatestAttempt(job.id);
  const isEligible = isJobEligible(job.id);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Back Link */}
      <button
        onClick={() => navigate('/jobs')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Jobs</span>
      </button>

      {/* Main Job Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={job.logo}
              alt={job.company}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={job.workplace === 'Remote' ? 'success' : 'brand'} size="sm">
                  {job.workplace}
                </Badge>
                <span className="text-xs text-slate-400">• Posted {job.postedDate}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mt-1">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <ReadinessBadge score={bestScore} requiredScore={job.minimumReadiness || 75} />
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{job.applicantsCount} applicants</span>
            </div>
          </div>
        </div>

        {/* Key Attributes Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium">Location</span>
            <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium">Job Type</span>
            <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-brand-500" />
              <span>{job.type} ({job.duration})</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium">Stipend / Salary</span>
            <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>{job.stipend}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium">Readiness Gate</span>
            <div className="font-bold text-brand-700 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>75% Minimum</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT 75% JOB READINESS GATE CENTERPIECE */}
      <ReadinessGateCard
        job={job}
        bestScore={bestScore}
        latestAttempt={latestAttempt}
        isEligible={isEligible}
      />

      {/* Role Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Responsibilities, Requirements */}
        <div className="md:col-span-2 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          {/* About Role */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">About the Role</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {job.aboutRole}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Responsibilities</h3>
            <ul className="space-y-2.5">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Requirements & Qualifications</h3>
            <ul className="space-y-2.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 1 Col: Required Skills & Assessment Specs */}
        <div className="space-y-6">
          {/* Required Skills Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Required Skills
            </h3>
            <p className="text-xs text-slate-500">
              The readiness assessment is generated directly from these skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Assessment Specifications */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              Assessment Specs
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between pb-1.5 border-b border-slate-800">
                <span>Questions:</span>
                <strong className="text-white">10 MCQs</strong>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-800">
                <span>Time Limit:</span>
                <strong className="text-white">10 Minutes</strong>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-800">
                <span>Passing Gate:</span>
                <strong className="text-emerald-400 font-bold">75% Minimum</strong>
              </div>
              <div className="flex justify-between">
                <span>Retakes Allowed:</span>
                <strong className="text-white">Unlimited</strong>
              </div>
            </div>

            <Button
              onClick={() => navigate(`/jobs/${job.id}/readiness`)}
              variant="glow"
              size="sm"
              className="w-full justify-center font-bold mt-2"
            >
              {isEligible ? 'Retake For Higher Score' : 'Take Readiness Test'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
