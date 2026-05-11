export const ERROR_RESPONSES = {
  UNKNOWN_COURSE: `I'm not familiar with that course code. Could you double-check the course number? You can also ask me about specific course categories like "core requirements" or "electives" and I can help you find what you're looking for.`,

  UNCLEAR_QUESTION: `I want to make sure I give you the most helpful answer. Could you rephrase your question or provide a bit more detail about what you'd like to know?`,

  OFF_TOPIC: `I'm specialized in UMass CS academic advising, so I can best help you with course planning, degree requirements, career guidance, or research opportunities. Is there something CS-related I can assist you with?`,

  TECHNICAL_ERROR: `I'm experiencing a technical issue right now. Please try asking your question again, or if the problem persists, you might want to contact the CS department directly.`,

  NO_COURSE_INFO: `I don't have detailed information about that specific course in my database. You might want to check the official course catalog or speak with a faculty advisor for the most up-to-date information.`,

  PREREQUISITE_CONFLICT: `I notice there might be a prerequisite issue with that course sequence. Let me help you work through the requirements to find the best path forward.`,

  SCHEDULING_CONFLICT: `It sounds like you're having trouble fitting courses into your schedule. I can help you explore alternative course sequences or suggest when certain courses are typically offered.`
};

export const FALLBACK_RESPONSES = [
  "I'm here to help with UMass CS academic advising. What would you like to know about courses, degree requirements, or career opportunities?",
  "I can assist you with course planning, research opportunities, or career guidance. What specific area interests you?",
  "Let me help you with your CS academic journey. Are you looking for information about courses, internships, or something else?",
  "I'm your UMass CS advisor. How can I help you succeed in your computer science studies today?"
];

export const getErrorResponse = (errorType: keyof typeof ERROR_RESPONSES): string => {
  return ERROR_RESPONSES[errorType] || ERROR_RESPONSES.UNCLEAR_QUESTION;
};

export const getRandomFallback = (): string => {
  const index = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[index] ?? "I'm here to help with UMass CS academic advising. How can I assist you today?";
};
