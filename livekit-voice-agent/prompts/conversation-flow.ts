export const CONVERSATION_FLOW = {
  GREETING: `Welcome! I'm your UMass CS academic advisor. I'm here to help you with course planning, degree requirements, career guidance, research opportunities, or any other CS-related questions you might have. How can I assist you today?`,

  FOLLOW_UP_QUESTIONS: {
    COURSE_PLANNING: `I'd be happy to help with your course planning! To give you the best advice, could you tell me:
    - What year are you in? (Freshman, Sophomore, Junior, Senior)
    - What courses have you already taken?
    - Are there any specific areas of CS you're interested in?`,

    CAREER_GUIDANCE: `Great! I can help you explore career paths in computer science. To provide personalized guidance, could you share:
    - What year are you in?
    - What areas of CS interest you most? (AI/ML, Web Development, Cybersecurity, etc.)
    - Are you looking for internships, full-time positions, or graduate school?`,

    RESEARCH_OPPORTUNITIES: `Excellent! UMass has many research opportunities. To connect you with the right opportunities, please tell me:
    - What year are you in?
    - What research areas interest you? (AI, Cybersecurity, Systems, etc.)
    - Are you looking for undergraduate research or considering graduate school?`,

    DEGREE_REQUIREMENTS: `I can help clarify degree requirements! To give you specific information, please let me know:
    - Are you pursuing a Bachelor's, Master's, or PhD?
    - What year are you in?
    - Are there specific requirements you're unsure about?`
  },

  CLARIFICATION: `I want to make sure I give you the most helpful information. Could you clarify what specific aspect you'd like to know more about?`,

  TRANSITION: `Is there anything else about [topic] you'd like to know, or would you like to discuss something else?`,

  ENDING: `I hope that information was helpful! Feel free to ask me about any other CS-related questions. Good luck with your studies!`
};

export const getFollowUpQuestion = (topic: string): string => {
  const topicKey = topic.toUpperCase().replace(/\s+/g, '_') as keyof typeof CONVERSATION_FLOW.FOLLOW_UP_QUESTIONS;
  return CONVERSATION_FLOW.FOLLOW_UP_QUESTIONS[topicKey] || CONVERSATION_FLOW.CLARIFICATION;
};
