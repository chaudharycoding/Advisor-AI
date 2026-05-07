export const STUDENT_PROFILES = {
  FRESHMAN: {
    focus: "Foundation building and exploration",
    priorities: ["Core requirements", "Math prerequisites", "General education"],
    advice: "Focus on building a strong foundation in programming and mathematics. Consider exploring different areas of CS through electives.",
    commonQuestions: ["What courses should I take first?", "How do I choose a major?", "What's the difference between CS tracks?"]
  },
  SOPHOMORE: {
    focus: "Core CS courses and specialization exploration",
    priorities: ["Data structures", "Object-oriented programming", "Math requirements"],
    advice: "This is a great time to explore different areas of CS. Consider taking electives in areas that interest you.",
    commonQuestions: ["What electives should I take?", "How do I prepare for internships?", "Should I consider a minor?"]
  },
  JUNIOR: {
    focus: "Upper-level courses and career preparation",
    priorities: ["Upper-level electives", "Internship preparation", "Research opportunities"],
    advice: "Focus on building expertise in your chosen area. Start thinking about internships and research opportunities.",
    commonQuestions: ["What upper-level courses should I take?", "How do I find research opportunities?", "What about internships?"]
  },
  SENIOR: {
    focus: "Capstone projects and post-graduation planning",
    priorities: ["Capstone project", "Job search", "Graduate school applications"],
    advice: "Complete your capstone project and finalize your post-graduation plans. Consider graduate school if interested in research.",
    commonQuestions: ["What capstone should I choose?", "How do I prepare for job interviews?", "Should I go to graduate school?"]
  },
  GRADUATE: {
    focus: "Advanced coursework and research",
    priorities: ["Research", "Thesis/dissertation", "Academic career preparation"],
    advice: "Focus on your research area and build relationships with faculty. Consider conference presentations and publications.",
    commonQuestions: ["How do I choose a research advisor?", "What courses support my research?", "How do I prepare for qualifying exams?"]
  }
};

export const INTEREST_AREAS = {
  "AI/ML": {
    recommendedCourses: ["CS 348", "CS 383", "CS 470", "CS 471", "CS 466"],
    careerPaths: ["Machine Learning Engineer", "Data Scientist", "AI Researcher", "ML Engineer"],
    researchAreas: ["Machine Learning", "Computer Vision", "Natural Language Processing", "Robotics"]
  },
  "WEB_DEVELOPMENT": {
    recommendedCourses: ["CS 326", "CS 320", "CS 410"],
    careerPaths: ["Frontend Developer", "Backend Developer", "Full-Stack Developer", "Web Architect"],
    researchAreas: ["Human-Computer Interaction", "Web Technologies", "User Experience"]
  },
  "CYBERSECURITY": {
    recommendedCourses: ["CS 345", "CS 460", "CS 474"],
    careerPaths: ["Security Analyst", "Penetration Tester", "Security Engineer", "Cybersecurity Consultant"],
    researchAreas: ["Network Security", "Cryptography", "Secure Software Development"]
  },
  "SYSTEMS": {
    recommendedCourses: ["CS 325", "CS 335", "CS 453"],
    careerPaths: ["Systems Engineer", "DevOps Engineer", "Cloud Architect", "Systems Administrator"],
    researchAreas: ["Operating Systems", "Distributed Systems", "Computer Networks"]
  },
  "SOFTWARE_ENGINEERING": {
    recommendedCourses: ["CS 320", "CS 410", "CS 490"],
    careerPaths: ["Software Engineer", "Software Architect", "Technical Lead", "Product Manager"],
    researchAreas: ["Software Engineering", "Software Testing", "Agile Development"]
  }
};

export const getStudentProfile = (year: string) => {
  const yearKey = year.toUpperCase() as keyof typeof STUDENT_PROFILES;
  return STUDENT_PROFILES[yearKey] || STUDENT_PROFILES.FRESHMAN;
};

export const getInterestArea = (interest: string) => {
  const interestKey = interest.toUpperCase().replace(/\s+/g, '_') as keyof typeof INTEREST_AREAS;
  return INTEREST_AREAS[interestKey] || null;
};

export const generatePersonalizedAdvice = (year: string, interest?: string) => {
  const profile = getStudentProfile(year);
  let advice = profile.advice;
  
  if (interest) {
    const interestArea = getInterestArea(interest);
    if (interestArea) {
      advice += ` Since you're interested in ${interest}, I'd recommend focusing on courses like ${interestArea.recommendedCourses.slice(0, 3).join(', ')}.`;
    }
  }
  
  return advice;
};
