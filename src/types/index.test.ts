import { describe, it, expect } from 'vitest'
import type { User, Course, Semester, Roadmap, ChatMessage, CourseCatalogItem } from './index'

describe('Data Model Types', () => {
  describe('User Type', () => {
    it('should validate a complete user object', () => {
      const user: User = {
        id: 'U12345',
        name: 'John Doe',
        email: 'john@university.edu',
        major: 'Computer Science',
        minor: 'Mathematics',
        year: 'Junior',
        gpa: 3.75,
        creditsCompleted: 90,
        creditsRequired: 120,
        advisor: 'Dr. Smith',
        expectedGraduation: 'Spring 2026',
      }

      expect(user.id).toBe('U12345')
      expect(user.email).toMatch(/@university\.edu$/)
      expect(user.gpa).toBeGreaterThanOrEqual(0)
      expect(user.gpa).toBeLessThanOrEqual(4.0)
      expect(user.creditsCompleted).toBeLessThan(user.creditsRequired)
    })

    it('should allow optional minor field', () => {
      const user: User = {
        id: 'U12346',
        name: 'Jane Smith',
        email: 'jane@university.edu',
        major: 'Data Science',
        year: 'Senior',
        gpa: 3.85,
        creditsCompleted: 110,
        creditsRequired: 120,
        advisor: 'Dr. Johnson',
        expectedGraduation: 'Fall 2025',
      }

      expect(user.minor).toBeUndefined()
    })

    it('should validate GPA is within valid range', () => {
      const validGPAs = [0.0, 2.5, 3.0, 3.5, 4.0]
      validGPAs.forEach((gpa) => {
        expect(gpa).toBeGreaterThanOrEqual(0)
        expect(gpa).toBeLessThanOrEqual(4.0)
      })
    })

    it('should validate credits completed is less than or equal to required', () => {
      const scenarios = [
        { completed: 30, required: 120 },
        { completed: 90, required: 120 },
        { completed: 120, required: 120 },
      ]

      scenarios.forEach(({ completed, required }) => {
        expect(completed).toBeLessThanOrEqual(required)
      })
    })
  })

  describe('Course Type', () => {
    it('should validate a completed course with grade', () => {
      const course: Course = {
        code: 'CS 101',
        name: 'Introduction to Programming',
        credits: 4,
        status: 'completed',
        grade: 'A',
      }

      expect(course.status).toBe('completed')
      expect(course.grade).toBeDefined()
      expect(['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']).toContain(course.grade)
    })

    it('should validate an in-progress course without grade', () => {
      const course: Course = {
        code: 'CS 520',
        name: 'Advanced Topics',
        credits: 3,
        status: 'in-progress',
      }

      expect(course.status).toBe('in-progress')
      expect(course.grade).toBeUndefined()
    })

    it('should validate a planned course', () => {
      const course: Course = {
        code: 'CS 540',
        name: 'Machine Learning',
        credits: 3,
        status: 'planned',
      }

      expect(course.status).toBe('planned')
      expect(['completed', 'in-progress', 'planned']).toContain(course.status)
    })

    it('should validate course credits are positive', () => {
      const validCredits = [1, 2, 3, 4, 5]
      validCredits.forEach((credits) => {
        expect(credits).toBeGreaterThan(0)
        expect(credits).toBeLessThanOrEqual(6)
      })
    })
  })

  describe('Semester Type', () => {
    it('should validate a semester with courses', () => {
      const semester: Semester = {
        term: 'Fall 2024',
        courses: [
          {
            code: 'CS 101',
            name: 'Intro to CS',
            credits: 4,
            status: 'completed',
            grade: 'A-',
          },
          {
            code: 'MATH 141',
            name: 'Calculus I',
            credits: 4,
            status: 'completed',
            grade: 'B+',
          },
        ],
      }

      expect(semester.courses).toHaveLength(2)
      expect(semester.term).toMatch(/^(Fall|Spring|Summer) \d{4}$/)
    })

    it('should calculate total credits in semester', () => {
      const semester: Semester = {
        term: 'Spring 2025',
        courses: [
          { code: 'CS 201', name: 'Data Structures', credits: 4, status: 'in-progress' },
          { code: 'CS 220', name: 'Computer Architecture', credits: 3, status: 'in-progress' },
          { code: 'MATH 240', name: 'Linear Algebra', credits: 4, status: 'in-progress' },
        ],
      }

      const totalCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0)
      expect(totalCredits).toBe(11)
    })

    it('should allow empty course list for future semesters', () => {
      const semester: Semester = {
        term: 'Fall 2026',
        courses: [],
      }

      expect(semester.courses).toHaveLength(0)
    })
  })

  describe('Roadmap Type', () => {
    it('should validate a complete academic roadmap', () => {
      const roadmap: Roadmap = {
        semesters: [
          {
            term: 'Fall 2023',
            courses: [
              { code: 'CS 101', name: 'Intro to CS', credits: 4, status: 'completed', grade: 'A' },
            ],
          },
          {
            term: 'Spring 2024',
            courses: [
              {
                code: 'CS 201',
                name: 'Data Structures',
                credits: 4,
                status: 'in-progress',
              },
            ],
          },
        ],
      }

      expect(roadmap.semesters).toHaveLength(2)
      expect(roadmap.semesters[0].courses[0].status).toBe('completed')
      expect(roadmap.semesters[1].courses[0].status).toBe('in-progress')
    })

    it('should calculate total credits across all semesters', () => {
      const roadmap: Roadmap = {
        semesters: [
          {
            term: 'Fall 2023',
            courses: [
              {
                code: 'CS 101',
                name: 'Intro to CS',
                credits: 4,
                status: 'completed',
                grade: 'A',
              },
              {
                code: 'MATH 141',
                name: 'Calculus',
                credits: 4,
                status: 'completed',
                grade: 'B+',
              },
            ],
          },
          {
            term: 'Spring 2024',
            courses: [
              { code: 'CS 201', name: 'Data Structures', credits: 4, status: 'completed', grade: 'A-' },
            ],
          },
        ],
      }

      const totalCredits = roadmap.semesters
        .flatMap((s) => s.courses)
        .reduce((sum, course) => sum + course.credits, 0)

      expect(totalCredits).toBe(12)
    })

    it('should count courses by status', () => {
      const roadmap: Roadmap = {
        semesters: [
          {
            term: 'Fall 2023',
            courses: [
              {
                code: 'CS 101',
                name: 'Intro',
                credits: 4,
                status: 'completed',
                grade: 'A',
              },
              {
                code: 'CS 102',
                name: 'Advanced',
                credits: 4,
                status: 'completed',
                grade: 'B',
              },
            ],
          },
          {
            term: 'Spring 2024',
            courses: [
              { code: 'CS 201', name: 'Current', credits: 3, status: 'in-progress' },
              { code: 'CS 301', name: 'Future', credits: 3, status: 'planned' },
            ],
          },
        ],
      }

      const allCourses = roadmap.semesters.flatMap((s) => s.courses)
      const completed = allCourses.filter((c) => c.status === 'completed')
      const inProgress = allCourses.filter((c) => c.status === 'in-progress')
      const planned = allCourses.filter((c) => c.status === 'planned')

      expect(completed).toHaveLength(2)
      expect(inProgress).toHaveLength(1)
      expect(planned).toHaveLength(1)
    })
  })

  describe('ChatMessage Type', () => {
    it('should validate a user message', () => {
      const message: ChatMessage = {
        role: 'user',
        content: 'What courses should I take next semester?',
        timestamp: new Date('2024-01-15T10:30:00Z'),
      }

      expect(message.role).toBe('user')
      expect(message.content.length).toBeGreaterThan(0)
      expect(message.timestamp).toBeInstanceOf(Date)
    })

    it('should validate an assistant message', () => {
      const message: ChatMessage = {
        role: 'assistant',
        content: 'Based on your roadmap, I recommend CS 301 and CS 320.',
        timestamp: new Date('2024-01-15T10:30:05Z'),
      }

      expect(message.role).toBe('assistant')
      expect(['user', 'assistant']).toContain(message.role)
    })

    it('should validate timestamp is a valid date', () => {
      const message: ChatMessage = {
        role: 'user',
        content: 'Test message',
        timestamp: new Date(),
      }

      expect(message.timestamp.getTime()).toBeLessThanOrEqual(Date.now())
    })
  })

  describe('CourseCatalogItem Type', () => {
    it('should validate a catalog course with prerequisites', () => {
      const course: CourseCatalogItem = {
        code: 'CS 520',
        name: 'Advanced Software Engineering',
        credits: 3,
        description: 'Advanced topics in software engineering',
        prerequisites: ['CS 320', 'CS 410'],
      }

      expect(course.prerequisites).toHaveLength(2)
      expect(course.credits).toBeGreaterThan(0)
    })

    it('should allow courses without prerequisites', () => {
      const course: CourseCatalogItem = {
        code: 'CS 101',
        name: 'Introduction to Programming',
        credits: 4,
        description: 'First course in computer science',
      }

      expect(course.prerequisites).toBeUndefined()
    })

    it('should validate required fields are present', () => {
      const course: CourseCatalogItem = {
        code: 'CS 201',
        name: 'Data Structures',
        credits: 4,
        description: 'Study of fundamental data structures',
      }

      expect(course.code).toBeDefined()
      expect(course.name).toBeDefined()
      expect(course.credits).toBeDefined()
      expect(course.description).toBeDefined()
    })

    it('should validate course code format', () => {
      const validCodes = ['CS 101', 'MATH 240', 'CS 520', 'ENGL 101']

      validCodes.forEach((code) => {
        expect(code).toMatch(/^[A-Z]{2,4} \d{3}$/)
      })
    })

    it('should validate description is not empty', () => {
      const course: CourseCatalogItem = {
        code: 'CS 301',
        name: 'Algorithms',
        credits: 3,
        description: 'Study of algorithm design and analysis',
      }

      expect(course.description.length).toBeGreaterThan(0)
      expect(typeof course.description).toBe('string')
    })
  })

  describe('Data Validation Helpers', () => {
    it('should validate email format for .edu domains', () => {
      const validEmails = [
        'student@university.edu',
        'john.doe@college.edu',
        'test@test.edu',
      ]

      validEmails.forEach((email) => {
        expect(email).toMatch(/@.*\.edu$/)
      })
    })

    it('should reject non-.edu emails', () => {
      const invalidEmails = [
        'user@gmail.com',
        'test@yahoo.com',
        'student@company.com',
      ]

      invalidEmails.forEach((email) => {
        expect(email).not.toMatch(/@.*\.edu$/)
      })
    })

    it('should validate course status values', () => {
      const validStatuses: Array<'completed' | 'in-progress' | 'planned'> = [
        'completed',
        'in-progress',
        'planned',
      ]

      validStatuses.forEach((status) => {
        expect(['completed', 'in-progress', 'planned']).toContain(status)
      })
    })

    it('should validate grade values', () => {
      const validGrades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']

      validGrades.forEach((grade) => {
        expect(grade).toMatch(/^[ABCDF][+-]?$/)
      })
    })
  })
})
