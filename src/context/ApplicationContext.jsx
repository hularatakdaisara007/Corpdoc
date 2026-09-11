import React, { createContext, useContext, useState, useEffect } from 'react';

const ApplicationContext = createContext(null);

const initialApplications = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Frontend Developer Intern",
    company: "ABC Technologies",
    location: "Bangalore",
    type: "Internship",
    stipend: "₹25,000/month",
    readinessScore: 82,
    status: "Under Review", // 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected'
    appliedAt: "11 Sep 2026",
    timeline: [
      { step: "Applied", date: "11 Sep 2026, 02:30 PM", completed: true, current: false, note: "Application submitted with 82% verified readiness score." },
      { step: "Under Review", date: "11 Sep 2026, 05:00 PM", completed: true, current: true, note: "Resume & Corpdoc assessment verified by hiring team." },
      { step: "Shortlisted", date: "Pending", completed: false, current: false, note: "Awaiting recruiter evaluation." },
      { step: "Interview", date: "Pending", completed: false, current: false, note: "Technical pairing round." },
      { step: "Selected", date: "Pending", completed: false, current: false, note: "Offer letter release." }
    ],
    resumeFileName: "Ayush_Jain_Resume.pdf",
    coverLetter: "I am passionate about building responsive, high-performance web applications using React and modern JavaScript. Having demonstrated 82% readiness on the Corpdoc assessment, I am confident in my abilities to immediately contribute to ABC Technologies' frontend engineering initiatives.",
    portfolioUrl: "https://ayushjain.dev",
    skillPerformance: [
      { skill: "JavaScript", score: 90 },
      { skill: "React", score: 84 },
      { skill: "REST API", score: 76 },
      { skill: "Git", score: 92 },
      { skill: "HTML/CSS", score: 88 }
    ]
  },
  {
    id: "app-102",
    jobId: "job-3",
    jobTitle: "UI / Product Designer Intern",
    company: "TechCorp Systems",
    location: "Hyderabad",
    type: "Internship",
    stipend: "₹20,000/month",
    readinessScore: 78,
    status: "Shortlisted",
    appliedAt: "08 Sep 2026",
    timeline: [
      { step: "Applied", date: "08 Sep 2026, 06:10 PM", completed: true, current: false, note: "Application submitted with 78% verified readiness." },
      { step: "Under Review", date: "09 Sep 2026, 10:00 AM", completed: true, current: false, note: "Portfolio reviewed by Senior Design Lead." },
      { step: "Shortlisted", date: "10 Sep 2026, 03:30 PM", completed: true, current: true, note: "Candidate shortlisted for design portfolio walk-through!" },
      { step: "Interview", date: "Scheduled: 14 Sep 2026", completed: false, current: false, note: "Video interview with Design Director." },
      { step: "Selected", date: "Pending", completed: false, current: false, note: "Final decision." }
    ],
    resumeFileName: "Ayush_Jain_Resume.pdf",
    coverLetter: "Excited to contribute to TechCorp's design system with clean Figma prototypes and semantic HTML/CSS implementation.",
    portfolioUrl: "https://ayushjain.dev",
    skillPerformance: [
      { skill: "HTML/CSS", score: 85 },
      { skill: "Figma", score: 80 },
      { skill: "JavaScript", score: 70 },
      { skill: "Design Systems", score: 78 }
    ]
  }
];

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('corpdoc_applications');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.some(a => a.resumeFileName?.includes('Shivali') || a.portfolioUrl?.includes('shivali'))) {
        return initialApplications;
      }
      return parsed;
    }
    return initialApplications;
  });

  useEffect(() => {
    localStorage.setItem('corpdoc_applications', JSON.stringify(applications));
  }, [applications]);

  const getApplicationById = (id) => {
    return applications.find((app) => app.id === id) || null;
  };

  const getApplicationByJobId = (jobId) => {
    return applications.find((app) => app.jobId === jobId) || null;
  };

  const submitApplication = ({ job, readinessScore, coverLetter, resumeFileName, portfolioUrl, skillPerformance }) => {
    if (readinessScore < 75) {
      throw new Error("Cannot apply: Minimum 75% Job Readiness score is required.");
    }

    const newAppId = `app-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const newApp = {
      id: newAppId,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      stipend: job.stipend,
      readinessScore,
      status: "Applied",
      appliedAt: formattedDate,
      timeline: [
        {
          step: "Applied",
          date: `${formattedDate}, ${now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`,
          completed: true,
          current: true,
          note: `Application submitted with verified ${readinessScore}% readiness score.`
        },
        { step: "Under Review", date: "Pending", completed: false, current: false, note: "Pending employer screening." },
        { step: "Shortlisted", date: "Pending", completed: false, current: false, note: "Awaiting candidate shortlist." },
        { step: "Interview", date: "Pending", completed: false, current: false, note: "Technical evaluation." },
        { step: "Selected", date: "Pending", completed: false, current: false, note: "Final offer release." }
      ],
      resumeFileName: resumeFileName || "Ayush_Jain_Resume.pdf",
      coverLetter: coverLetter || "Excited to apply for this opportunity with my verified Corpdoc readiness score.",
      portfolioUrl: portfolioUrl || "https://ayushjain.dev",
      skillPerformance: skillPerformance || []
    };

    setApplications((prev) => [newApp, ...prev.filter((a) => a.jobId !== job.id)]);
    return newApp;
  };

  const resetApplications = () => {
    setApplications(initialApplications);
    localStorage.removeItem('corpdoc_applications');
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        getApplicationById,
        getApplicationByJobId,
        submitApplication,
        resetApplications
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error('useApplications must be used within an ApplicationProvider');
  return context;
};
