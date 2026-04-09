// Mock degree requirements data for Five College Consortium
export const COLLEGES = [
  'Amherst College',
  'Hampshire College',
  'Mount Holyoke College',
  'Smith College',
  'University of Massachusetts Amherst'
];

export const MAJORS_BY_INSTITUTION: Record<string, string[]> = {
  'Amherst College': [
    'Computer Science',
  ],
  'Hampshire College': [
    'Computer Science',
  ],
  'Mount Holyoke College': [
    'Computer Science',
  ],
  'Smith College': [
    'Computer Science',
  ],
  'University of Massachusetts Amherst': [
    'Computer Science',
  ]
};

export interface DegreeRequirements {
  majorCredits: number;
  genEdCredits: number;
  electiveCredits: number;
  totalCredits: number;
}

export const DEGREE_REQUIREMENTS: Record<string, DegreeRequirements> = {
  'Computer Science': {
    majorCredits: 40,
    genEdCredits: 30,
    electiveCredits: 32,
    totalCredits: 120
  },
};

export const loadDegreeRequirements = (institution: string, major: string): DegreeRequirements | null => {
  return DEGREE_REQUIREMENTS[major] || null;
};
