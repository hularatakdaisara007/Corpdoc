import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import {
  User,
  GraduationCap,
  Sparkles,
  FileText,
  Link2,
  ExternalLink,
  Edit,
  MapPin,
  Mail,
  Phone,
  FolderGit2,
  CheckCircle2,
  Upload,
  Eye
} from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, updateResume } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || 'Ayush Jain',
    headline: user?.headline || 'Computer Science Student',
    location: user?.location || 'Bangalore, India',
    bio: user?.bio || '',
    phone: user?.phone || '+91 98765 43210'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editData);
    setIsEditModalOpen(false);
  };

  const handleReplaceResume = () => {
    const newName = "Ayush_Jain_Resume_Updated.pdf";
    updateResume(newName);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"}
              alt={user?.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {user?.name || "Ayush Jain"}
                </h1>
                <Badge variant="success" size="sm">
                  Verified Candidate
                </Badge>
              </div>
              <p className="text-sm font-semibold text-brand-600">
                {user?.headline || "Computer Science Student & Full Stack Enthusiast"}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.location || "Bangalore, India"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setEditData({
                name: user?.name || '',
                headline: user?.headline || '',
                location: user?.location || '',
                bio: user?.bio || '',
                phone: user?.phone || ''
              });
              setIsEditModalOpen(true);
            }}
            variant="secondary"
            size="md"
            icon={Edit}
          >
            EDIT PROFILE
          </Button>
        </div>

        {/* Bio */}
        {user?.bio && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          </div>
        )}
      </div>

      {/* Profile Details 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Education, Projects, Demonstrated Skills */}
        <div className="lg:col-span-2 space-y-8">
          {/* Education Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-600" />
              Education & Academics
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  {user?.education?.college || "RV College of Engineering"}
                </h4>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  {user?.education?.year || "2024 – 2028"}
                </span>
              </div>
              <div className="text-xs text-brand-600 font-semibold">
                {user?.education?.degree || "B.Tech in Computer Science & Engineering"}
              </div>
              <div className="text-xs text-slate-500 pt-1">
                CGPA: <strong className="text-slate-800">{user?.education?.cgpa || "8.9 / 10.0"}</strong>
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-brand-600" />
              Featured Projects
            </h3>

            <div className="space-y-4">
              {user?.projects?.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstrated Skills List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              Skills & Assessment Scores
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {user?.skills?.map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <div className="text-xs font-bold text-slate-900">{s.name}</div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{s.level}</span>
                    <strong className="text-brand-600 font-mono">{s.score}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Resume & Social Links */}
        <div className="space-y-6">
          {/* Resume Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              Primary Resume
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {user?.resume?.fileName || "Ayush_Jain_Resume.pdf"}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Uploaded {user?.resume?.uploadedAt || "10 Sep 2026"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  onClick={() => alert(`Viewing ${user?.resume?.fileName || 'Resume'}`)}
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  className="w-full text-xs"
                >
                  VIEW
                </Button>
                <Button
                  onClick={handleReplaceResume}
                  variant="outline"
                  size="sm"
                  icon={Upload}
                  className="w-full text-xs"
                >
                  REPLACE
                </Button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-brand-600" />
              Social & Portfolio Links
            </h3>

            <div className="space-y-2.5 text-xs">
              <a
                href={user?.links?.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-slate-800 transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={user?.links?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-slate-800 transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={user?.links?.portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-slate-800 transition-colors"
              >
                <span>Portfolio Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Profile"
        subtitle="Update your basic contact details and bio"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Headline</label>
            <input
              type="text"
              value={editData.headline}
              onChange={(e) => setEditData({ ...editData, headline: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Bio</label>
            <textarea
              rows={3}
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <Button onClick={() => setIsEditModalOpen(false)} variant="secondary" size="md">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
