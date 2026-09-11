import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../../context/ApplicationContext';
import { useAssessment } from '../../context/AssessmentContext';
import { useJobs } from '../../context/JobContext';
import { ApplicationCard } from '../../components/applications/ApplicationCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export const MyApplications = () => {
  const navigate = useNavigate();
  const { applications } = useApplications();
  const { jobs } = useJobs();
  const { getBestScore, isJobEligible } = useAssessment();

  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Applied', 'Under Review', 'Shortlisted', 'Rejected'];

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'All') return true;
    return app.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Find jobs where the student took an assessment but scored < 75% (ineligible)
  const ineligibleJobs = jobs.filter((j) => {
    const score = getBestScore(j.id);
    return score !== null && score < 75;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-brand-600" />
            My Applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your verified applications across all 5 recruitment stages.
          </p>
        </div>

        <Button
          onClick={() => navigate('/jobs')}
          variant="glow"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
        >
          Find More Jobs
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const count =
            tab === 'All'
              ? applications.length
              : applications.filter((a) => a.status.toLowerCase() === tab.toLowerCase()).length;

          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications Cards Grid */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No applications in this tab</h3>
            <p className="text-xs text-slate-500 mt-1">
              Pass the 75% gate on any job to submit an application.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}

      {/* Ineligible Jobs Section (Distinct from active applications) */}
      {ineligibleJobs.length > 0 && (
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Not Eligible Yet (Below 75% Gate)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              These jobs are locked until you improve your weak skills and retake the assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ineligibleJobs.map((job) => {
              const score = getBestScore(job.id);
              return (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                    <div className="text-xs text-slate-500">{job.company}</div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-bold">
                      <span>Readiness: {score}% ❌</span>
                      <span className="text-slate-400 font-normal">(75% Required)</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/jobs/${job.id}/readiness`)}
                    variant="outline"
                    size="sm"
                    icon={RotateCcw}
                    className="flex-shrink-0"
                  >
                    Improve Readiness
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
