import React from 'react';
import mockUserData from '../data/mockUser.json';

export const Profile: React.FC = () => {
  const { profile, roadmap } = mockUserData;

  // Calculate completed courses
  const allCourses = roadmap.semesters.flatMap(s => s.courses);
  const completedCourses = allCourses.filter(c => c.status === 'completed');
  const inProgressCourses = allCourses.filter(c => c.status === 'in-progress');

  // Calculate grade distribution
  const gradeDistribution = completedCourses.reduce((acc, course) => {
    if ('grade' in course && course.grade && typeof course.grade === 'string') {
      const grade = course.grade.replace(/[+-]/g, ''); // Remove + or -
      acc[grade] = (acc[grade] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Academic Profile</h1>
        <p className="text-slate-400">Complete academic record and degree progress for {profile.name.split(' ')[0]}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - Student Info */}
        <div className="col-span-1 space-y-6">
          {/* Personal Info */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Student Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                <p className="text-sm text-slate-200">{profile.name}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <p className="text-sm text-slate-200">{profile.email}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Student ID</label>
                <p className="text-sm text-accent-blue">{profile.id}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Academic Advisor</label>
                <p className="text-sm text-slate-200">{profile.advisor}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Class Year</label>
                <p className="text-sm text-slate-200">{profile.year}</p>
              </div>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Academic Progress</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Cumulative GPA</label>
                <p className="text-3xl font-bold glow-text">{profile.gpa.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Credits Earned</label>
                <p className="text-sm text-slate-200 mb-2">{profile.creditsCompleted} / {profile.creditsRequired}</p>
                <div className="bg-dark-bg rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full"
                    style={{ width: `${(profile.creditsCompleted / profile.creditsRequired) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Courses Completed</label>
                <p className="text-sm text-slate-200">{completedCourses.length}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Courses In Progress</label>
                <p className="text-sm text-slate-200">{inProgressCourses.length}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Expected Graduation</label>
                <p className="text-sm text-slate-200">{profile.expectedGraduation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Degree Requirements & Grades */}
        <div className="col-span-2 space-y-6">
          {/* Degree Requirements */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Degree Requirements</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Declared Major</label>
                <p className="text-lg text-accent-blue font-semibold">{profile.major}</p>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Declared Minor</label>
                <p className="text-lg text-accent-purple font-semibold">{profile.minor || 'None'}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
                <span className="text-sm text-slate-400">Major Requirements</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-200">32 / 40 credits</span>
                  <div className="w-32 bg-dark-bg rounded-full h-2">
                    <div className="bg-accent-blue h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
                <span className="text-sm text-slate-400">Minor Requirements</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-200">12 / 18 credits</span>
                  <div className="w-32 bg-dark-bg rounded-full h-2">
                    <div className="bg-accent-purple h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
                <span className="text-sm text-slate-400">General Education</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-200">24 / 30 credits</span>
                  <div className="w-32 bg-dark-bg rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dark-border/30">
                <span className="text-sm text-slate-400">Electives</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-200">20 / 32 credits</span>
                  <div className="w-32 bg-dark-bg rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Grade Distribution</h2>
            <div className="space-y-4">
              {Object.entries(gradeDistribution)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([grade, count]) => {
                  const percentage = (count / completedCourses.length) * 100;
                  return (
                    <div key={grade}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-slate-200">Grade {grade}</span>
                        <span className="text-slate-400 text-sm">
                          {count} {count === 1 ? 'course' : 'courses'} • {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-bg/60 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all ${
                            grade === 'A'
                              ? 'bg-gradient-to-r from-accent-blue to-accent-purple'
                              : grade === 'B'
                              ? 'bg-accent-blue/60'
                              : 'bg-slate-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Recent Courses */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Courses</h2>
              <button className="text-xs text-accent-blue hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {completedCourses.slice(-5).reverse().map((course) => (
                <div key={course.code} className="flex items-center justify-between p-3 bg-dark-bg/40 rounded-lg hover:bg-dark-panel/30 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-200">{course.code}</h3>
                    <p className="text-xs text-slate-400">{course.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{course.credits} credits</span>
                    {('grade' in course && course.grade && typeof course.grade === 'string') ? (
                      <span className="px-2.5 py-1 bg-accent-blue/20 text-accent-blue text-sm font-semibold rounded">
                        {course.grade as string}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
