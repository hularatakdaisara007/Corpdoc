import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { ApplicationTimeline } from '../../components/applications/ApplicationTimeline';
import { ReadinessBadge } from '../../components/common/ReadinessBadge';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  FileText,
  FileCheck2,
  ShieldCheck,
  ExternalLink,
  Globe,
  Sparkles
} from 'lucide-react';

export const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById } = useApplications();

  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Application Not Found</h2>
        <Button onClick={() => navigate('/applications')} variant="secondary" icon={ArrowLeft}>
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Back Link */}
      <button
        onClick={() => navigate('/applications')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm">
                ID: {app.id}
              </Badge>
              <span className="text-xs text-slate-400">• Applied on {app.appliedAt}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {app.jobTitle}
            </h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{app.company}</span>
              <span className="text-slate-300">•</span>
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{app.location}</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <ReadinessBadge score={app.readinessScore} requiredScore={75} />
            <Button
              onClick={() => navigate(`/jobs/${app.jobId}/readiness/result`)}
              variant="secondary"
              size="sm"
              icon={FileCheck2}
            >
              View Readiness Result
            </Button>
          </div>
        </div>
      </div>

      {/* Application Timeline (5-stage recruitment progress) */}
      <ApplicationTimeline timeline={app.timeline} />

      {/* Submitted Details & Verified Skill Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Submitted Documents */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600" />
            Submitted Documents & Cover Letter
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{app.resumeFileName}</div>
                <div className="text-[11px] text-slate-500">PDF • Verified Candidate Resume</div>
              </div>
            </div>
            <span className="text-xs text-brand-600 font-bold">Attached</span>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cover Letter
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {app.coverLetter}
            </div>
          </div>

          {app.portfolioUrl && (
            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Portfolio: </span>
              <a
                href={app.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 font-bold hover:underline flex items-center gap-1"
              >
                {app.portfolioUrl}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Right: Attached Assessment Performance */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Readiness Record
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Passed 75% Gate
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Overall Readiness Score</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">
                {app.readinessScore}%
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>Required Benchmark: <strong>75%</strong></div>
              <div className="text-emerald-600 font-bold mt-0.5">Eligible Candidate</div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Evaluated Skills Breakdown
            </span>
            {app.skillPerformance?.map((sp) => (
              <div key={sp.skill} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">{sp.skill}</span>
                  <span className="font-mono font-bold text-slate-700">{sp.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${sp.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
