import React from 'react';

export const LoadingSkeleton: React.FC<{ type?: 'card' | 'table' | 'scan' }> = ({ type = 'card' }) => {
  if (type === 'scan') {
    return (
      <div className="w-full glass-card rounded-3xl p-6 space-y-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-slate-200/70 dark:bg-slate-700/70 rounded-2xl"></div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full glass-card rounded-3xl p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3"></div>
    </div>
  );
};
