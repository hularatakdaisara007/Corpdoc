import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import { ReadinessBadge } from '../common/ReadinessBadge';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { getBestScore, isJobEligible } = useAssessment();

  const userScore = getBestScore(job.id);
  const isEligible = isJobEligible(job.id);

  const handleCardAction = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Header: Logo + Title + Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <img
              src={job.logo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          <Badge variant={job.workplace === 'Remote' ? 'success' : 'default'} size="sm">
            {job.workplace}
          </Badge>
        </div>

        {/* Meta Info: Location, Type, Stipend */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.stipend}</span>
          </div>
        </div>

        {/* Required Skills Chips */}
        <div className="mt-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Required Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: 75% Gate Indicator & Action Button */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Readiness State Pill */}
        <div>
          <ReadinessBadge score={userScore} requiredScore={job.minimumReadiness || 75} />
        </div>

        {/* Direct Action Button: Takes to Job details for Gate Verification */}
        <Button
          onClick={handleCardAction}
          variant={isEligible ? 'primary' : 'outline'}
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto font-bold"
        >
          {isEligible ? 'VIEW JOB' : userScore !== null ? 'CHECK READINESS' : 'VIEW JOB'}
        </Button>
      </div>
    </div>
  );
};
