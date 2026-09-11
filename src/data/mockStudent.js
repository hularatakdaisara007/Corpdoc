export const initialStudentProfile = {
  id: "std_ayush_01",
  name: "Ayush Jain",
  email: "ayush.jain@student.corpdoc.in",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250",
  headline: "Computer Science Student & Full Stack Enthusiast",
  phone: "+91 98765 43210",
  location: "Bangalore, India",
  role: "Student",
  bio: "Passionate 3rd-year CS student eager to build scalable web apps, APIs, and modern frontend interfaces. Actively demonstrating readiness across React, JavaScript, REST APIs, and backend architectures.",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    college: "RV College of Engineering",
    location: "Bangalore",
    year: "2024 – 2028",
    cgpa: "8.9 / 10.0"
  },
  skills: [
    { name: "JavaScript", level: "Advanced", score: 90, demonstrated: true, verifiedAt: "2026-09-08" },
    { name: "React", level: "Good", score: 82, demonstrated: true, verifiedAt: "2026-09-10" },
    { name: "HTML/CSS", level: "Good", score: 88, demonstrated: true, verifiedAt: "2026-09-05" },
    { name: "Git", level: "Strong", score: 95, demonstrated: true, verifiedAt: "2026-09-02" },
    { name: "REST API", level: "Needs Improvement", score: 72, demonstrated: true, verifiedAt: "2026-09-11" },
    { name: "Python", level: "Intermediate", score: 61, demonstrated: true, verifiedAt: "2026-09-07" },
    { name: "SQL", level: "Intermediate", score: 68, demonstrated: true, verifiedAt: "2026-09-06" },
    { name: "Tailwind CSS", level: "Advanced", score: 92, demonstrated: true, verifiedAt: "2026-09-09" },
  ],
  resume: {
    fileName: "Ayush_Jain_Resume.pdf",
    uploadedAt: "10 Sep 2026",
    size: "1.8 MB",
    downloadUrl: "#"
  },
  projects: [
    {
      id: "p1",
      title: "CampusConnect - Event Discovery Portal",
      description: "A responsive React web app connecting 3,000+ campus students with hackathons, tech talks, and club activities with live RSVPs.",
      skills: ["React", "JavaScript", "Tailwind CSS", "REST API"],
      githubUrl: "https://github.com/ayushjain/campus-connect",
      liveUrl: "https://campusconnect-demo.vercel.app"
    },
    {
      id: "p2",
      title: "DevSprint - Agile Task Tracker",
      description: "Collaborative Kanban board with real-time updates, drag-and-drop mechanics, and RESTful API integration.",
      skills: ["React", "Node.js", "Git", "REST API"],
      githubUrl: "https://github.com/ayushjain/dev-sprint",
      liveUrl: "https://devsprint-demo.vercel.app"
    }
  ],
  links: {
    github: "https://github.com/ayushjain",
    linkedin: "https://linkedin.com/in/ayushjain-cs",
    portfolio: "https://ayushjain.dev"
  },
  stats: {
    skillsCount: 8,
    averageReadiness: 82,
    eligibleJobsCount: 12,
    applicationsCount: 4
  }
};
