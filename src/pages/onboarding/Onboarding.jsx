import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import {
  User,
  GraduationCap,
  Sparkles,
  FileText,
  Link2,
  Check,
  Plus,
  X,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // Multi-step form state
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Ayush Jain',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    college: 'RV College of Engineering',
    degree: 'B.Tech in Computer Science',
    branch: 'Computer Science & Engineering',
    year: '2024 – 2028',
    skills: user?.skills || [
      { name: "JavaScript", level: "Advanced", score: 90, demonstrated: true },
      { name: "React", level: "Good", score: 82, demonstrated: true },
      { name: "HTML/CSS", level: "Good", score: 88, demonstrated: true },
      { name: "Git", level: "Strong", score: 95, demonstrated: true },
      { name: "REST API", level: "Needs Improvement", score: 72, demonstrated: true },
      { name: "Python", level: "Intermediate", score: 61, demonstrated: true },
    ],
    resumeFileName: 'Ayush_Jain_Resume.pdf',
    github: 'https://github.com/ayushjain',
    linkedin: 'https://linkedin.com/in/ayushjain-cs',
    portfolio: 'https://ayushjain.dev'
  });

  const [newSkillText, setNewSkillText] = useState('');

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Skills", icon: Sparkles },
    { number: 4, title: "Resume", icon: FileText },
    { number: 5, title: "Links", icon: Link2 },
  ];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    if (formData.skills.some((s) => s.name.toLowerCase() === newSkillText.trim().toLowerCase())) return;

    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { name: newSkillText.trim(), level: "Intermediate", score: 70, demonstrated: false }
      ]
    }));
    setNewSkillText('');
  };

  const handleRemoveSkill = (skillNameToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillNameToRemove)
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    completeOnboarding(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-3 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span className="text-lg font-extrabold tracking-tight">Corpdoc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Complete Your Student Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build your profile to unlock job-specific readiness assessments
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              const Icon = step.icon;

              return (
                <div key={step.number} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-300 z-10 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : isCurrent
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30 ring-4 ring-brand-500/20'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <span className={`text-[11px] font-semibold mt-2 hidden sm:block ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/90 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-brand-400" />
                Step 1: Personal Information
              </h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-400" />
                Step 2: Education
              </h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                Step 3: Skills
              </h3>
              <p className="text-xs text-slate-400">
                Add skills you know. You will be able to demonstrate these through job-specific readiness assessments.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillText}
                  onChange={(e) => setNewSkillText(e.target.value)}
                  placeholder="e.g. Docker, TypeScript, Next.js"
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <Button onClick={handleAddSkill} variant="primary" size="md" icon={Plus}>
                  Add Skill
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/70 border border-slate-600 text-xs font-semibold text-slate-200"
                  >
                    <span>{s.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.name)}
                      className="hover:text-rose-400 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Resume */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-400" />
                Step 4: Resume
              </h3>
              <p className="text-xs text-slate-400">
                Upload your resume. When you cross the 75% readiness gate for any job, this resume will be attached to your application.
              </p>

              <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-900/60 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 mx-auto flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Resume uploaded: <span className="text-emerald-400 font-mono">{formData.resumeFileName}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">PDF format, 1.8 MB</div>
                </div>
                <Button variant="secondary" size="sm">
                  Replace Resume
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Links */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-brand-400" />
                Step 5: Professional Links
              </h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">GitHub Profile</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Portfolio URL</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button onClick={handlePrev} variant="secondary" size="md" icon={ArrowLeft}>
                Back
              </Button>
            ) : <div />}

            {currentStep < 5 ? (
              <Button onClick={handleNext} variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Next Step
              </Button>
            ) : (
              <Button onClick={handleFinish} variant="glow" size="lg" icon={Check} iconPosition="right" className="font-bold px-8">
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
