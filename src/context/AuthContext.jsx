import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudentProfile } from '../data/mockStudent';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('corpdoc_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === 'Shivali') {
        return initialStudentProfile;
      }
      return parsed;
    }
    return initialStudentProfile;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authStatus = localStorage.getItem('corpdoc_auth');
    return authStatus ? JSON.parse(authStatus) : true; // Default logged in for smooth demo
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    const status = localStorage.getItem('corpdoc_onboarding');
    return status ? JSON.parse(status) : true;
  });

  useEffect(() => {
    localStorage.setItem('corpdoc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('corpdoc_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('corpdoc_onboarding', JSON.stringify(onboardingCompleted));
  }, [onboardingCompleted]);

  const login = (email, password) => {
    setIsAuthenticated(true);
    return true;
  };

  const register = (userData) => {
    setUser((prev) => ({
      ...prev,
      name: userData.fullName || prev.name,
      email: userData.email || prev.email,
    }));
    setIsAuthenticated(true);
    setOnboardingCompleted(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const completeOnboarding = (onboardingData) => {
    setUser((prev) => ({
      ...prev,
      name: onboardingData.fullName || prev.name,
      phone: onboardingData.phone || prev.phone,
      location: onboardingData.location || prev.location,
      education: {
        ...prev.education,
        college: onboardingData.college || prev.education.college,
        degree: onboardingData.degree || prev.education.degree,
        year: onboardingData.year || prev.education.year,
      },
      skills: onboardingData.skills || prev.skills,
      links: {
        ...prev.links,
        github: onboardingData.github || prev.links.github,
        linkedin: onboardingData.linkedin || prev.links.linkedin,
        portfolio: onboardingData.portfolio || prev.links.portfolio,
      }
    }));
    setOnboardingCompleted(true);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const updateResume = (newFileName) => {
    setUser((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        fileName: newFileName,
        uploadedAt: "Just now"
      }
    }));
  };

  const addSkill = (newSkillName) => {
    if (!newSkillName) return;
    setUser((prev) => {
      if (prev.skills.some((s) => s.name.toLowerCase() === newSkillName.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        skills: [
          ...prev.skills,
          { name: newSkillName, level: "Intermediate", score: 70, demonstrated: false }
        ]
      };
    });
  };

  const resetToDemoStudent = () => {
    setUser(initialStudentProfile);
    setIsAuthenticated(true);
    setOnboardingCompleted(true);
    localStorage.removeItem('corpdoc_assessments');
    localStorage.removeItem('corpdoc_applications');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        onboardingCompleted,
        login,
        register,
        logout,
        completeOnboarding,
        updateProfile,
        updateResume,
        addSkill,
        resetToDemoStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
