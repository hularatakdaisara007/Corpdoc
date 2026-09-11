import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('ayush.jain@student.corpdoc.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail('ayush.jain@student.corpdoc.in');
    setPassword('demoPass2026');
    login('ayush.jain@student.corpdoc.in', 'demoPass2026');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Brand Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-4 shadow-xl">
          <ShieldCheck className="w-7 h-7 text-brand-400" />
          <span className="text-2xl font-extrabold tracking-tight">Corpdoc</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Welcome back 👋
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          "Prove you're ready. Then apply."
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
          {/* 75% Gate Notice */}
          <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-start gap-3 text-xs text-brand-200">
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">75% Job Readiness Gate Enabled:</strong> Demonstrate job-specific skills before unlocking applications.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <a href="#" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="lg"
              loading={loading}
              className="w-full font-bold justify-center mt-2"
            >
              Login
            </Button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="pt-2 border-t border-slate-700/60">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-600 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Quick Login as Ayush Jain (CS Student)</span>
            </button>
          </div>

          <div className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-brand-400 hover:text-brand-300 underline underline-offset-2">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
