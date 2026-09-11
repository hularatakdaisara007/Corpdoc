import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockQuestionsByJob } from '../data/mockQuestions';

const AssessmentContext = createContext(null);

// Default initial assessment history matching the prompt specs
const initialAssessments = {
  "job-1": [
    {
      id: "att_frontend_1",
      jobId: "job-1",
      jobTitle: "Frontend Developer Intern",
      company: "ABC Technologies",
      score: 68,
      isPassed: false,
      attemptNumber: 1,
      takenAt: "10 Sep 2026, 11:30 AM",
      totalQuestions: 10,
      correctCount: 6.8,
      skillBreakdown: [
        { skill: "JavaScript", score: 82, status: "good" },
        { skill: "React", score: 71, status: "warning" },
        { skill: "REST API", score: 40, status: "critical" },
        { skill: "Git", score: 90, status: "good" },
        { skill: "HTML/CSS", score: 78, status: "good" }
      ],
      weakestSkill: "REST API",
      gapPercentage: 7, // 75 - 68 = 7%
      answers: {}
    },
    {
      id: "att_frontend_2",
      jobId: "job-1",
      jobTitle: "Frontend Developer Intern",
      company: "ABC Technologies",
      score: 82,
      isPassed: true,
      attemptNumber: 2,
      takenAt: "11 Sep 2026, 02:15 PM",
      totalQuestions: 10,
      correctCount: 8,
      skillBreakdown: [
        { skill: "JavaScript", score: 90, status: "good" },
        { skill: "React", score: 84, status: "good" },
        { skill: "REST API", score: 76, status: "good" },
        { skill: "Git", score: 92, status: "good" },
        { skill: "HTML/CSS", score: 88, status: "good" }
      ],
      weakestSkill: "REST API",
      gapPercentage: 0,
      answers: {}
    }
  ],
  "job-2": [
    {
      id: "att_backend_1",
      jobId: "job-2",
      jobTitle: "Backend Developer Intern",
      company: "XYZ Technologies",
      score: 64,
      isPassed: false,
      attemptNumber: 1,
      takenAt: "09 Sep 2026, 04:00 PM",
      totalQuestions: 10,
      correctCount: 6.4,
      skillBreakdown: [
        { skill: "Python", score: 61, status: "critical" },
        { skill: "SQL", score: 68, status: "warning" },
        { skill: "REST API", score: 70, status: "warning" },
        { skill: "Django", score: 60, status: "critical" },
        { skill: "Git", score: 85, status: "good" }
      ],
      weakestSkill: "Django",
      gapPercentage: 11,
      answers: {}
    }
  ],
  "job-3": [
    {
      id: "att_ui_1",
      jobId: "job-3",
      jobTitle: "UI / Product Designer Intern",
      company: "TechCorp Systems",
      score: 78,
      isPassed: true,
      attemptNumber: 1,
      takenAt: "08 Sep 2026, 05:45 PM",
      totalQuestions: 10,
      correctCount: 8,
      skillBreakdown: [
        { skill: "HTML/CSS", score: 85, status: "good" },
        { skill: "Figma", score: 80, status: "good" },
        { skill: "JavaScript", score: 70, status: "warning" },
        { skill: "Design Systems", score: 78, status: "good" }
      ],
      weakestSkill: "JavaScript",
      gapPercentage: 0,
      answers: {}
    }
  ]
};

export const AssessmentProvider = ({ children }) => {
  const [assessmentHistory, setAssessmentHistory] = useState(() => {
    const saved = localStorage.getItem('corpdoc_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  useEffect(() => {
    localStorage.setItem('corpdoc_assessments', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  // Retrieve all attempts for a given job
  const getJobAttempts = (jobId) => {
    return assessmentHistory[jobId] || [];
  };

  // Get the most recent attempt for a job
  const getLatestAttempt = (jobId) => {
    const attempts = assessmentHistory[jobId] || [];
    if (attempts.length === 0) return null;
    return attempts[attempts.length - 1];
  };

  // Get the highest score achieved for a job
  const getBestScore = (jobId) => {
    const attempts = assessmentHistory[jobId] || [];
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map((a) => a.score));
  };

  // Check if student has satisfied the 75% Job Readiness Gate
  const isJobEligible = (jobId) => {
    const bestScore = getBestScore(jobId);
    return bestScore !== null && bestScore >= 75;
  };

  // Calculate score and skill breakdown from real user answers
  const evaluateAssessment = (job, userAnswers) => {
    const questions = mockQuestionsByJob[job.id] || mockQuestionsByJob["job-1"];
    let correctCount = 0;
    const skillStats = {};

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount += 1;

      if (!skillStats[q.skill]) {
        skillStats[q.skill] = { total: 0, correct: 0 };
      }
      skillStats[q.skill].total += 1;
      if (isCorrect) skillStats[q.skill].correct += 1;
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const isPassed = score >= 75;

    const skillBreakdown = Object.keys(skillStats).map((skillName) => {
      const stat = skillStats[skillName];
      const skillScore = Math.round((stat.correct / stat.total) * 100);
      let status = "good";
      if (skillScore < 50) status = "critical";
      else if (skillScore < 75) status = "warning";

      return {
        skill: skillName,
        score: skillScore,
        status
      };
    });

    // Find weakest skill
    let weakestSkill = skillBreakdown[0]?.skill || "General";
    let lowestScore = 101;
    skillBreakdown.forEach((item) => {
      if (item.score < lowestScore) {
        lowestScore = item.score;
        weakestSkill = item.skill;
      }
    });

    const existingAttempts = assessmentHistory[job.id] || [];
    const attemptNumber = existingAttempts.length + 1;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + `, ${now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`;

    const newAttempt = {
      id: `att_${job.id}_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      score,
      isPassed,
      attemptNumber,
      takenAt: formattedDate,
      totalQuestions: questions.length,
      correctCount,
      skillBreakdown,
      weakestSkill,
      gapPercentage: isPassed ? 0 : Math.max(0, 75 - score),
      answers: userAnswers
    };

    setAssessmentHistory((prev) => ({
      ...prev,
      [job.id]: [...(prev[job.id] || []), newAttempt]
    }));

    return newAttempt;
  };

  // Quick Demo Trigger for Hackathon: Simulate Attempt 1 (68% Failed)
  const triggerDemoAttempt1 = (jobId = "job-1") => {
    const demo1 = {
      id: `att_demo1_${Date.now()}`,
      jobId,
      jobTitle: "Frontend Developer Intern",
      company: "ABC Technologies",
      score: 68,
      isPassed: false,
      attemptNumber: 1,
      takenAt: "Just now",
      totalQuestions: 10,
      correctCount: 6.8,
      skillBreakdown: [
        { skill: "JavaScript", score: 82, status: "good" },
        { skill: "React", score: 71, status: "warning" },
        { skill: "REST API", score: 40, status: "critical" },
        { skill: "Git", score: 90, status: "good" },
        { skill: "HTML/CSS", score: 78, status: "good" }
      ],
      weakestSkill: "REST API",
      gapPercentage: 7,
      answers: {}
    };

    setAssessmentHistory((prev) => ({
      ...prev,
      [jobId]: [demo1] // Overwrite to fresh 1st attempt
    }));

    return demo1;
  };

  // Quick Demo Trigger for Hackathon: Simulate Attempt 2 (82% Passed)
  const triggerDemoAttempt2 = (jobId = "job-1") => {
    const prevAttempts = assessmentHistory[jobId] || [];
    const demo2 = {
      id: `att_demo2_${Date.now()}`,
      jobId,
      jobTitle: "Frontend Developer Intern",
      company: "ABC Technologies",
      score: 82,
      isPassed: true,
      attemptNumber: (prevAttempts.length || 1) + 1,
      takenAt: "Just now",
      totalQuestions: 10,
      correctCount: 8.2,
      skillBreakdown: [
        { skill: "JavaScript", score: 90, status: "good" },
        { skill: "React", score: 84, status: "good" },
        { skill: "REST API", score: 76, status: "good" },
        { skill: "Git", score: 92, status: "good" },
        { skill: "HTML/CSS", score: 88, status: "good" }
      ],
      weakestSkill: "REST API",
      gapPercentage: 0,
      answers: {}
    };

    setAssessmentHistory((prev) => ({
      ...prev,
      [jobId]: [...prevAttempts, demo2]
    }));

    return demo2;
  };

  const resetAssessments = () => {
    setAssessmentHistory(initialAssessments);
    localStorage.removeItem('corpdoc_assessments');
  };

  return (
    <AssessmentContext.Provider
      value={{
        assessmentHistory,
        getJobAttempts,
        getLatestAttempt,
        getBestScore,
        isJobEligible,
        evaluateAssessment,
        triggerDemoAttempt1,
        triggerDemoAttempt2,
        resetAssessments
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) throw new Error('useAssessment must be used within an AssessmentProvider');
  return context;
};
