import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Roadmap: React.FC = () => {
  const { roadmap } = mockUserData;

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Academic Roadmap</h1>
        <p className="text-slate-400">Track your complete academic journey from freshman to graduation</p>
      </div>

      {/* Semester Grid */}
      <div className="grid grid-cols-2 gap-6">
        {roadmap.semesters.map((semester) => {
          const isCurrentSemester = semester.courses.some(c => c.status === 'in-progress');
          const isCompletedSemester = semester.courses.every(c => c.status === 'completed');

          return (
            <div
              key={semester.term}
              className={`card relative overflow-hidden ${
                isCurrentSemester ? 'border-accent-blue/50 shadow-glow-lg' : ''
              }`}
            >
              {/* Semester Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border/40">
                <div>
                  <h2 className="text-xl font-serif mb-1">{semester.term}</h2>
                  <p className="text-xs text-slate-500">{semester.totalCredits} credits</p>
                </div>
                {isCurrentSemester && (
                  <span className="px-3 py-1 bg-accent-blue/20 border border-accent-blue/40 text-accent-blue text-xs font-medium rounded-lg">
                    In Progress
                  </span>
                )}
                {isCompletedSemester && (
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-medium rounded-lg">
                    Completed
                  </span>
                )}
              </div>

              {/* Course List */}
              <div className="space-y-3">
                {semester.courses.map((course) => (
                  <div
                    key={course.code}
                    className="group p-3 bg-dark-bg/40 rounded-lg border border-dark-border/30 hover:border-accent-blue/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-200">{course.code}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{course.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{course.credits} cr</span>
                        {course.status === 'completed' && 'grade' in course && course.grade && (
                          <span className="px-2 py-0.5 bg-accent-blue/20 text-accent-blue text-xs font-semibold rounded">
                            {course.grade}
                          </span>
                        )}
                        {course.status === 'in-progress' && (
                          <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          course.type === 'Major'
                            ? 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue'
                            : course.type === 'Minor'
                            ? 'bg-accent-purple/10 border border-accent-purple/30 text-accent-purple'
                            : course.type === 'Core'
                            ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                            : 'bg-slate-700/50 border border-slate-600/30 text-slate-400'
                        }`}
                      >
                        {course.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
