export interface User {
  student_id: number;
  user_id: string;
  name: string;
  email: string | null;
  major: string | null;
  year: number | null;
  advisor_name: string | null;
  gpa: number | null;
  credits_completed: number | null;
  credits_required: number | null;
  expected_graduation: number | null;
}

export interface UserData {
  profile: User;
  roadmap: Roadmap;
  chatHistory: ChatHistory;
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
