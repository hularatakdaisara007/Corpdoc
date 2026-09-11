import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Shield,
  RotateCcw,
  LogOut,
  Check,
  Zap
} from 'lucide-react';

export const Settings = () => {
  const { user, logout, resetToDemoStudent } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('account');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);

  const handleSaveSettings = () => {
    showToast({
      title: "Settings Saved",
      message: "Your preferences have been updated successfully.",
      type: "success"
    });
  };

  const handleResetData = () => {
    resetToDemoStudent();
    showToast({
      title: "Demo Data Reset",
      message: "All state has been restored to default demo values.",
      type: "info"
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-brand-600" />
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account preferences, notifications, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="space-y-1">
          {[
            { id: 'account', name: 'Account', icon: User },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'security', name: 'Security & Password', icon: Lock },
            { id: 'privacy', name: 'Privacy & 75% Gate', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900">Account Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || "Ayush Jain"}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email || "ayush.jain@student.corpdoc.in"}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Verified College Domain Email
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSaveSettings} variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Assessment Score Alerts</div>
                    <div className="text-xs text-slate-500">Get notified when you clear the 75% gate on any job.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Application Stage Updates</div>
                    <div className="text-xs text-slate-500">Receive alerts when an employer shortlists your profile.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={applicationUpdates}
                    onChange={(e) => setApplicationUpdates(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Skill Gap Practice Reminders</div>
                    <div className="text-xs text-slate-500">Recommended study modules for skills below 75%.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={assessmentReminders}
                    onChange={(e) => setAssessmentReminders(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSaveSettings} variant="primary" size="md">
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900">Change Password</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSaveSettings} variant="primary" size="md">
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {/* Privacy & 75% Gate info */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900">Privacy & 75% Gate Policy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corpdoc strictly protects candidate privacy. Employers only receive verified test scores once you intentionally submit an application after crossing the 75% benchmark. Unsuccessful attempts are private to you.
              </p>
            </div>
          )}

          {/* Danger Zone: Demo Reset & Logout */}
          <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200 space-y-4">
            <h4 className="text-sm font-bold text-rose-900">Hackathon Demo & Session Management</h4>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                onClick={handleResetData}
                variant="secondary"
                size="sm"
                icon={RotateCcw}
                className="border-rose-200 text-rose-700 hover:bg-rose-100"
              >
                Reset All Demo Data
              </Button>

              <Button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                variant="danger"
                size="sm"
                icon={LogOut}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
