export interface UserData {
  profile: User;
  roadmap: Roadmap;
  chatHistory: ChatHistory;
}

export interface User {
  id: string;
  name: string;
  email: string;
  major: string;
  minor?: string;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior";
  expectedGraduation: string;
  gpa: number;
  creditsCompleted: number;
  creditsRequired: number;
  advisor: string;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  semester: string;
  grade?: string;
  status: "completed" | "in-progress" | "planned";
  type: "Core" | "Major" | "Minor" | "Elective";
  description: string;
  prerequisites?: string[];
  department?: string;
}

export interface Roadmap {
  semesters: Semester[];
}

export interface Semester {
  term: string;
  year: number;
  season: "Fall" | "Spring" | "Summer";
  courses: Course[];
  totalCredits: number;
}

export interface ChatHistory {
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface CourseCatalogItem {
  code: string;
  name: string;
  credits: number;
  type: "Core" | "Major" | "Minor" | "Elective";
  description: string;
  prerequisites?: string[];
  department: string;
  availableSemesters: ("Fall" | "Spring" | "Summer")[];
}
