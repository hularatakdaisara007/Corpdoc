import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useAssessment } from '../../context/AssessmentContext';
import { useApplications } from '../../context/ApplicationContext';
import { JobCard } from '../../components/jobs/JobCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ReadinessBadge } from '../../components/common/ReadinessBadge';
import { PracticeModal } from '../../components/assessment/PracticeModal';
import {
  Sparkles,
  Award,
  Briefcase,
  FileText,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { assessmentHistory, getBestScore } = useAssessment();
  const { applications } = useApplications();
  const navigate = useNavigate();

  const [practiceSkill, setPracticeSkill] = useState(null);

  // Derive stats dynamically
  const userSkillsCount = user?.skills?.length || 8;
  const eligibleJobsCount = jobs.filter((j) => {
    const score = getBestScore(j.id);
    return score !== null && score >= 75;
  }).length;

  const averageReadiness = 82;

  // Recommended jobs (Top 3)
  const recommendedJobs = jobs.slice(0, 3);

  // Skill gaps from profile/assessments
  const skillGaps = [
    { name: "REST API", score: 72, reason: "Needs improvement for Backend & Frontend roles" },
    { name: "Python", score: 61, reason: "Below 75% gate for Backend Developer roles" },
  ];

  // Recent Assessments list
  const recentTests = [
    { title: "Frontend Developer", company: "ABC Technologies", score: 82, isPassed: true, date: "11 Sep 2026" },
    { title: "Python Backend Developer", company: "XYZ Technologies", score: 64, isPassed: false, date: "09 Sep 2026" },
    { title: "UI / Product Designer", company: "TechCorp Systems", score: 78, isPassed: true, date: "08 Sep 2026" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-brand-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Job Readiness Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good morning, {user?.name?.split(' ')[0] || "Ayush"} 👋
          </h1>
          <p className="text-sm text-slate-300">
            Find opportunities you're ready for. Clear the 75% gate to apply.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button
            onClick={() => navigate('/jobs')}
            variant="glow"
            size="md"
            icon={Briefcase}
          >
            Explore All Jobs
          </Button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Skills */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Skills
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {userSkillsCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">Skills</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across Frontend & Backend</p>
        </div>

        {/* Card 2: Average Readiness */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Avg. Readiness
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {averageReadiness}%
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              &gt; 75% Gate
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Based on recent tests</p>
        </div>

        {/* Card 3: Eligible Jobs */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Eligible Jobs
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              12
            </span>
            <span className="text-xs font-semibold text-slate-500">Roles</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ready to apply today</p>
        </div>

        {/* Card 4: Applications */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Applications
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {applications.length || 4}
            </span>
            <span className="text-xs font-semibold text-slate-500">Active</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">1 Shortlisted • 3 Review</p>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recommended Jobs</h2>
            <p className="text-xs text-slate-500">
              Opportunities matching your profile and demonstrated skills
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View all {jobs.length} jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* Two Column Layout: Skill Gaps & Recent Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Your Skill Gaps */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Your Skill Gaps
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Targeted areas to boost readiness above 75%
              </p>
            </div>
            <Button
              onClick={() => setPracticeSkill('REST API')}
              variant="outline"
              size="sm"
              icon={BookOpen}
            >
              Improve Skills
            </Button>
          </div>

          <div className="space-y-3 pt-2">
            {skillGaps.map((gap) => (
              <div
                key={gap.name}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{gap.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {gap.score}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{gap.reason}</p>
                </div>

                <Button
                  onClick={() => setPracticeSkill(gap.name)}
                  variant="secondary"
                  size="sm"
                  className="flex-shrink-0 text-xs"
                >
                  Practice
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Assessments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                Recent Assessments
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrated performance history
              </p>
            </div>
            <Link
              to="/assessments"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {recentTests.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    t.isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {t.isPassed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{t.title}</div>
                    <div className="text-xs text-slate-500">{t.company} • {t.date}</div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className={`text-sm font-extrabold ${t.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.score}% {t.isPassed ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Sandbox Modal */}
      {practiceSkill && (
        <PracticeModal
          isOpen={!!practiceSkill}
          skillName={practiceSkill}
          onClose={() => setPracticeSkill(null)}
        />
      )}
    </div>
  );
};
