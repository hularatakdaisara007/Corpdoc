import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import { useJobs } from '../../context/JobContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ReadinessBadge } from '../../components/common/ReadinessBadge';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export const AssessmentHistory = () => {
  const navigate = useNavigate();
  const { assessmentHistory, getBestScore } = useAssessment();
  const { jobs } = useJobs();

  const allAssessmentEntries = Object.entries(assessmentHistory);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <FileCheck2 className="w-7 h-7 text-brand-600" />
            Readiness Assessments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track all job-specific evaluations, score attempts, and eligibility status.
          </p>
        </div>

        <Button
          onClick={() => navigate('/jobs')}
          variant="glow"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
        >
          Take New Assessment
        </Button>
      </div>

      {/* 75% Gate Summary Banner */}
      <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Mandatory 75% Readiness Benchmark
            </h4>
            <p className="text-xs text-slate-600">
              Scores are calculated directly from job-specific skill requirements. Cross 75% to unlock applications.
            </p>
          </div>
        </div>
      </div>

      {/* Assessments Grouped by Job */}
      <div className="space-y-5">
        {allAssessmentEntries.map(([jobId, attempts]) => {
          const latest = attempts[attempts.length - 1];
          const best = getBestScore(jobId);
          const job = jobs.find((j) => j.id === jobId) || {
            title: latest.jobTitle || "Developer Role",
            company: latest.company || "Company"
          };

          return (
            <div
              key={jobId}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    <Badge variant={best >= 75 ? 'success' : 'danger'} size="sm">
                      {best >= 75 ? 'Gate Passed' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ReadinessBadge score={best} requiredScore={75} />
                  <Button
                    onClick={() => navigate(`/jobs/${jobId}/readiness/test`)}
                    variant="secondary"
                    size="sm"
                    icon={RotateCcw}
                  >
                    Retake
                  </Button>
                </div>
              </div>

              {/* Attempts Timeline */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Attempt History ({attempts.length} attempts)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {attempts.map((att, i) => (
                    <div
                      key={att.id || i}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                        att.isPassed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Attempt {att.attemptNumber || i + 1}</span>
                          {att.isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{att.takenAt}</div>
                      </div>

                      <div className="text-right">
                        <div className={`font-mono font-extrabold text-sm ${att.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {att.score}%
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {att.isPassed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
