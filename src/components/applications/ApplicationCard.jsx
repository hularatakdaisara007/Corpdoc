import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReadinessBadge } from '../common/ReadinessBadge';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  const statusVariant = {
    'Applied': 'brand',
    'Under Review': 'info',
    'Shortlisted': 'success',
    'Interview': 'purple',
    'Selected': 'success'
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-slate-400">ID: {application.id}</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mt-0.5">
              {application.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{application.company}</span>
            </div>
          </div>

          <Badge variant={statusVariant[application.status] || 'brand'} size="sm">
            {application.status}
          </Badge>
        </div>

        {/* Details Row */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{application.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Applied: {application.appliedAt}</span>
          </div>
        </div>
      </div>

      {/* Bottom Readiness Gate & CTA */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <ReadinessBadge score={application.readinessScore} requiredScore={75} />

        <Button
          onClick={() => navigate(`/applications/${application.id}`)}
          variant="secondary"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto font-bold"
        >
          VIEW APPLICATION
        </Button>
      </div>
    </div>
  );
};
