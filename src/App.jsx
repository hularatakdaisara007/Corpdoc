import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout
import { StudentLayout } from './components/layout/StudentLayout';

// Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Onboarding } from './pages/onboarding/Onboarding';
import { Dashboard } from './pages/dashboard/Dashboard';
import { FindJobs } from './pages/jobs/FindJobs';
import { JobDetails } from './pages/jobs/JobDetails';
import { ReadinessIntro } from './pages/readiness/ReadinessIntro';
import { AssessmentTest } from './pages/readiness/AssessmentTest';
import { AssessmentResult } from './pages/readiness/AssessmentResult';
import { ApplyJob } from './pages/application/ApplyJob';
import { ApplicationSuccess } from './pages/application/ApplicationSuccess';
import { AssessmentHistory } from './pages/assessments/AssessmentHistory';
import { MySkills } from './pages/skills/MySkills';
import { MyApplications } from './pages/applications/MyApplications';
import { ApplicationDetails } from './pages/applications/ApplicationDetails';
import { Profile } from './pages/profile/Profile';
import { Settings } from './pages/settings/Settings';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <JobProvider>
            <AssessmentProvider>
              <ApplicationProvider>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/onboarding" element={<Onboarding />} />

                  {/* Protected Student Portal Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <StudentLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="jobs" element={<FindJobs />} />
                    <Route path="jobs/:id" element={<JobDetails />} />
                    <Route path="jobs/:id/readiness" element={<ReadinessIntro />} />
                    <Route path="jobs/:id/readiness/test" element={<AssessmentTest />} />
                    <Route path="jobs/:id/readiness/result" element={<AssessmentResult />} />
                    <Route path="jobs/:id/apply" element={<ApplyJob />} />
                    <Route path="jobs/:id/apply/success" element={<ApplicationSuccess />} />
                    <Route path="assessments" element={<AssessmentHistory />} />
                    <Route path="skills" element={<MySkills />} />
                    <Route path="applications" element={<MyApplications />} />
                    <Route path="applications/:id" element={<ApplicationDetails />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </ApplicationProvider>
            </AssessmentProvider>
          </JobProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
