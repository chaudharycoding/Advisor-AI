import React, { useState } from 'react';
import mockCourses from '../data/mockCourses.json';

export const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Get unique departments
  const departments = ['All', ...Array.from(new Set(mockCourses.map(c => c.department)))];

  // Get unique types
  const types = ['All', 'Major', 'Minor', 'Core', 'Elective'];

  // Filter courses
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'All' || course.department === selectedDepartment;

    const matchesType = selectedType === 'All' || course.type === selectedType;

    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif mb-3">Course Catalog</h1>
        <p className="text-slate-400">Browse and explore all available courses</p>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Course name or code..."
              className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-blue/50 transition-colors"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Course Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-blue/50 transition-colors"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm">
          Showing <span className="text-accent-blue font-semibold">{filteredCourses.length}</span> of {mockCourses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div key={course.code} className="card hover:scale-105 transition-transform duration-300">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg">{course.code}</h3>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    course.type === 'Major'
                      ? 'bg-accent-blue/20 text-accent-blue'
                      : course.type === 'Minor'
                      ? 'bg-accent-purple/20 text-accent-purple'
                      : course.type === 'Core'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {course.type}
                </span>
              </div>
              <h4 className="text-sm text-slate-300 font-medium mb-2">{course.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{course.description}</p>
            </div>

            <div className="space-y-2.5 text-sm pt-4 border-t border-dark-border/40">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Credits</span>
                <span className="font-semibold text-accent-blue">{course.credits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Department</span>
                <span className="text-slate-300">{course.department}</span>
              </div>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-2">Prerequisites</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="px-2 py-1 bg-dark-bg/60 border border-dark-border/40 rounded-lg text-xs text-slate-400"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="text-slate-500 block mb-2">Offered</span>
                <div className="flex flex-wrap gap-1.5">
                  {course.availableSemesters.map((semester) => (
                    <span
                      key={semester}
                      className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/30 rounded-lg text-xs text-accent-blue"
                    >
                      {semester}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="card text-center py-16">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">No courses found matching your criteria</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};
