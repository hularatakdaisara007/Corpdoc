import React from 'react';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../../components/jobs/JobCard';
import { FilterBar } from '../../components/jobs/FilterBar';
import { JobCardSkeleton } from '../../components/common/SkeletonLoader';
import { Briefcase, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export const FindJobs = () => {
  const { filteredJobs, jobs } = useJobs();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-brand-600" />
            Find Jobs & Internships
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Every job requires demonstrating 75% readiness on job-specific assessments before applying.
          </p>
        </div>

        {/* 75% Gate Reminder Banner */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>75% Readiness Standard Active</span>
        </div>
      </div>

      {/* Search & Filters */}
      <FilterBar />

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredJobs.length}</strong> of {jobs.length} opportunities
        </span>
        <span className="text-emerald-600 font-bold">
          🔒 75% Gate Verified Applications Only
        </span>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No jobs match your filters</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for "React", "Python", or clearing filter options.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
