import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Play, RotateCcw, CheckCircle2, XCircle, ChevronDown, ChevronUp, Zap, HelpCircle } from 'lucide-react';

export const DemoBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerDemoAttempt1, triggerDemoAttempt2, resetAssessments } = useAssessment();
  const { showToast } = useNotifications();
  const { resetToDemoStudent } = useAuth();
  const navigate = useNavigate();

  const handleDemoFail = () => {
    triggerDemoAttempt1("job-1");
    showToast({
      title: "Demo 1st Attempt Activated",
      message: "Score: 68% ❌ | Weak Skill: REST API (40%). Apply button is LOCKED.",
      type: "warning"
    });
    navigate('/jobs/job-1/readiness/result');
  };

  const handleDemoPass = () => {
    triggerDemoAttempt2("job-1");
    showToast({
      title: "Demo 2nd Attempt Activated 🎉",
      message: "Score: 82% ✅ | 75% Gate PASSED! 'Apply Now' is unlocked.",
      type: "success"
    });
    navigate('/jobs/job-1/readiness/result');
  };

  const handleReset = () => {
    resetAssessments();
    resetToDemoStudent();
    showToast({
      title: "Demo Data Reset",
      message: "All assessment attempts, applications, and student state restored.",
      type: "info"
    });
    navigate('/dashboard');
  };

  return (
    <aside aria-label="Hackathon Demo Controller" className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md w-full">
      <div className="bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Header Toggle */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              SIH Hackathon Demo Controller
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              75% Gate Live
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {/* Expandable Control Panel */}
        {isOpen && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3 animate-fade-in text-xs">
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Use these shortcuts to demonstrate the complete 75% Job Readiness Gate cycle to judges:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDemoFail}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl font-medium transition-all text-left"
              >
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <div>
                  <div className="font-bold">1. Fail Attempt</div>
                  <div className="text-[10px] text-rose-200/80">68% ❌ Blocked</div>
                </div>
              </button>

              <button
                onClick={handleDemoPass}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl font-medium transition-all text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-bold">2. Pass Attempt</div>
                  <div className="text-[10px] text-emerald-200/80">82% ✅ Unlocks Apply</div>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => navigate('/jobs/job-1')}
                className="text-[11px] text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 underline underline-offset-2"
              >
                <Play className="w-3 h-3" /> Jump to Frontend Job
              </button>

              <button
                onClick={handleReset}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                title="Reset all states"
              >
                <RotateCcw className="w-3 h-3" /> Reset Data
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
