import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1",
    md: "px-2.5 py-1 text-xs font-medium gap-1.5",
    lg: "px-3 py-1.5 text-sm font-semibold gap-2",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    brand: "bg-brand-50 text-brand-700 border border-brand-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    danger: "bg-rose-50 text-rose-700 border border-rose-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    dark: "bg-slate-800 text-slate-100 border border-slate-700"
  };

  return (
    <span className={`inline-flex items-center rounded-full ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
};
