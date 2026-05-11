import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'completed' | 'in-progress' | 'planned' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'px-2 py-1 rounded text-xs font-medium';

  const variantClasses = {
    completed: 'bg-green-900 text-green-200 border border-green-700',
    'in-progress': 'bg-blue-900 text-blue-200 border border-blue-700',
    planned: 'bg-gray-700 text-gray-300 border border-gray-600',
    default: 'bg-dark-panel text-white border border-dark-border'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
