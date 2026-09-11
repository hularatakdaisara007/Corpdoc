import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

const initialNotifications = [
  {
    id: "notif-1",
    title: "Readiness Verified 🎉",
    message: "Your readiness score for Frontend Developer Intern reached 82%. You are eligible to apply!",
    type: "success",
    timestamp: "2 hours ago",
    read: false,
    link: "/jobs/job-1"
  },
  {
    id: "notif-2",
    title: "Application Under Review 📢",
    message: "ABC Technologies hiring team is reviewing your application and verified readiness report.",
    type: "info",
    timestamp: "4 hours ago",
    read: false,
    link: "/applications/app-101"
  },
  {
    id: "notif-3",
    title: "Candidate Shortlisted ⭐",
    message: "TechCorp Systems shortlisted you for UI / Product Designer Intern!",
    type: "shortlist",
    timestamp: "Yesterday",
    read: true,
    link: "/applications/app-102"
  },
  {
    id: "notif-4",
    title: "Skill Improvement Recommended ⚠️",
    message: "You scored 64% in Python Backend readiness. Practice REST APIs and SQL to unlock application.",
    type: "warning",
    timestamp: "2 days ago",
    read: true,
    link: "/skills"
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const showToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = `toast-${Date.now()}`;
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
