import { genEdData } from './gen-ed-courses.ts';

export const GENERAL_EDUCATION_REQUIREMENTS = {
  // General Education Overview
  "General Education": {
    description: "University-wide general education requirements for UMass Amherst students admitted as freshmen, enrolling Fall 2018 and later",
    courseList: "Use getGeneralEducationCourseList() to access all available Gen Ed courses and their designations",
    courses: genEdData,
    totalCredits: 27,
    categories: [
      {
        name: "Writing",
        credits: 0,
        description: "2 courses - COLLEGE WRITING (CW, 0-3 credits): Completion of either English Writing 112 OR a satisfactory score on the Writing Placement Test, combined SAT I Critical Reading and Writing Tests, or Advanced Placement Exam (Language and Composition only). JUNIOR YEAR WRITING: To be taken in the student's major.",
        designation: "CW"
      },
      {
        name: "Basic Mathematics and Analytical Reasoning",
        credits: 3,
        description: "2 courses - Students must complete one course in Basic Math Skills (R1) or get a satisfactory score on the Basic Mathematics Skills Exemption Test. This requirement can also be satisfied with a higher level course that presupposes knowledge of basic math skills. BASIC MATHEMATICS (R1, 0-3 total credits) and ANALYTICAL REASONING (R2, 3 credits).",
        designation: "R1, R2"
      },
      {
        name: "Biological and Physical World",
        credits: 8,
        description: "2 courses (8 total credits) - Each 4-credit course requirement may also be satisfied by two 3-credit courses with the appropriate designation. BIOLOGICAL SCIENCE (BS) and PHYSICAL SCIENCE (PS).",
        designation: "BS, PS"
      },
      {
        name: "Social World",
        credits: 16,
        description: "4 courses (16 total credits) - Within the Social World requirements, two courses must meet the Social and Cultural Diversity requirement. One course must focus on Diversity in the United States (DU); the other must focus on Global Diversity (DG). Students are expected to take a DU or DG course in their first year. LITERATURE (AL) or ARTS (AT), HISTORICAL STUDIES (HS), SOCIAL AND BEHAVIORAL SCIENCES (SB), ADDITIONAL SOCIAL WORLD (AL, AT, or SB) or INTERDISCIPLINARY (I or SI).",
        designation: "AL, AT, HS, SB, I, SI, DU, DG"
      },
      {
        name: "Integrative Experience",
        credits: 3,
        description: "3 credits - Part of major requirements; to be taken at UMass Amherst.",
      }
    ],
    notes: [
      "From your major, one course may be applied to Junior Year Writing, one course may be applied to Integrative Experience, and one course may be applied to another General Education requirement",
      "In addition, one other course from your major may be used to fulfill a Diversity requirement",
      "Any course taken on a Pass/Fail basis will not fulfill Gen Ed requirements",
      "No more than three Interdisciplinary (I) or Science Interdisciplinary (SI) courses may be applied to Gen Ed and Diversity requirements",
      "Course list: Use getGeneralEducationCourseList() to access all available Gen Ed courses and their designations"
    ]
  },
};

export const GENERAL_EDUCATION_SUMMARY = {
  totalCredits: 27,
  referenceFile: "First-year.txt",
    courseList: "Use getGeneralEducationCourseList() to access all available Gen Ed courses and their designations",
  description: "Complete general education requirements for UMass Amherst students admitted as freshmen, enrolling Fall 2018 and later",
  quickReference: {
    writing: "2 courses - College Writing (CW) and Junior Year Writing (in major)",
    math: "2 courses - Basic Mathematics (R1) and Analytical Reasoning (R2)",
    science: "2 courses (8 credits) - Biological Science (BS) and Physical Science (PS)",
    social: "4 courses (16 credits) - Literature/Arts, Historical Studies, Social/Behavioral Sciences, Additional Social World",
    diversity: "2 courses within Social World - Diversity in US (DU) and Global Diversity (DG)",
    integrative: "3 credits - Part of major requirements"
  },
  importantNotes: [
    "From your major, one course may be applied to Junior Year Writing, one course may be applied to Integrative Experience, and one course may be applied to another General Education requirement",
    "In addition, one other course from your major may be used to fulfill a Diversity requirement",
    "Any course taken on a Pass/Fail basis will not fulfill Gen Ed requirements",
    "No more than three Interdisciplinary (I) or Science Interdisciplinary (SI) courses may be applied to Gen Ed and Diversity requirements",
      "Course list: Use getGeneralEducationCourseList() to access all available Gen Ed courses and their designations"
  ]
};

export const getGeneralEducationInfo = (category: string) => {
  return GENERAL_EDUCATION_REQUIREMENTS[category as keyof typeof GENERAL_EDUCATION_REQUIREMENTS] || null;
};

export const getGeneralEducationCourseList = () => {
  return genEdData;
};

export const getGeneralEducationSummary = () => {
  return GENERAL_EDUCATION_SUMMARY;
};

