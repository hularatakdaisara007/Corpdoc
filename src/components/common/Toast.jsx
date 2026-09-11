import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-500 flex-shrink-0" />
  };

  const bgStyles = {
    success: "border-emerald-200 bg-emerald-50/90 text-emerald-900",
    warning: "border-amber-200 bg-amber-50/90 text-amber-900",
    error: "border-rose-200 bg-rose-50/90 text-rose-900",
    info: "border-brand-200 bg-brand-50/90 text-brand-900"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-up ${bgStyles[toast.type] || bgStyles.info}`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold">{toast.title}</h4>
            {toast.message && <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
