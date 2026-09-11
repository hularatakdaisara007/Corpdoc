import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useApplications } from '../../context/ApplicationContext';
import { Button } from '../../components/common/Button';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  FileCheck2,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const ApplicationSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getJobById } = useJobs();
  const { getApplicationByJobId } = useApplications();

  const job = getJobById(id);
  const application = location.state?.application || getApplicationByJobId(id) || {
    id: "app-101",
    jobTitle: job?.title || "Frontend Developer Intern",
    company: job?.company || "ABC Technologies",
    readinessScore: 82,
    status: "Applied"
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-fade-in">
      {/* Big Animated Success Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Stage 1 Completed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          🎉 Application Submitted!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your profile and verified <strong>{application.readinessScore}% readiness score</strong> have been sent to <strong>{application.company}</strong>.
        </p>
      </div>

      {/* Application Snapshot Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md text-left space-y-4 max-w-md mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-mono text-slate-400">Application ID: {application.id}</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {application.status}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900">{application.jobTitle}</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{application.company}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-slate-600 font-medium">Attached Readiness Score:</span>
          <strong className="text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> {application.readinessScore}% ✅
          </strong>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          onClick={() => navigate(`/applications/${application.id}`)}
          variant="glow"
          size="lg"
          icon={FileCheck2}
          className="w-full sm:w-auto font-bold px-8 bg-gradient-to-r from-brand-600 to-indigo-600"
        >
          VIEW APPLICATION
        </Button>

        <Button
          onClick={() => navigate('/jobs')}
          variant="secondary"
          size="lg"
          icon={Briefcase}
          className="w-full sm:w-auto font-bold"
        >
          FIND MORE JOBS
        </Button>
      </div>
    </div>
  );
};
