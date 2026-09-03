import React from 'react';

export const StatusCellRenderer = (params) => {
  const isActive = params.value;
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export const SkillsCellRenderer = (params) => {
  const skills = params.value || [];
  return (
    <div className="flex flex-wrap gap-1 items-center h-full">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-1.5 py-0.5 rounded text-xs bg-slate-200 text-slate-700"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};