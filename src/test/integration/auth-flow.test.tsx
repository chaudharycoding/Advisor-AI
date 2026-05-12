import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../../App'

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      updateUser: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

// Mock LiveKit component to avoid WebRTC issues in tests
vi.mock('../../components/livekit/VoiceAssistantLiveKit', () => ({
  VoiceAssistantLiveKit: () => <div>Mocked Voice Assistant</div>,
}))

describe('Authentication Flow Integration Tests', () => {
  const mockUser = {
    id: '123',
    email: 'test@university.edu',
    user_metadata: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
    },
    aud: 'authenticated',
    created_at: '2024-01-01',
  }

  const mockUserWithoutOnboarding = {
    id: '456',
    email: 'newuser@university.edu',
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2024-01-01',
  }

  const mockSession = {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    user: mockUser,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    const { supabase } = require('../../lib/supabase')

    // Default: no session
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })
  })

  describe('Sign Up → Onboarding → Dashboard Flow', () => {
    it('should redirect unauthenticated user to login page', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
      })
    })

    it('should allow user to navigate to signup page', async () => {
      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
      })

      const signupLink = screen.getByText(/create account/i)
      await userEvent.click(signupLink)

      await waitFor(() => {
        expect(screen.getByText(/create your account/i)).toBeInTheDocument()
      })
    })

    it('should complete signup and redirect to onboarding for new user', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.signUp.mockResolvedValue({
        data: {
          user: mockUserWithoutOnboarding,
          session: {
            ...mockSession,
            user: mockUserWithoutOnboarding,
          },
        },
        error: null,
      })

      render(<App />)

      // Navigate to signup
      await waitFor(() => screen.getByText(/welcome back/i))
      const signupLink = screen.getByText(/create account/i)
      await userEvent.click(signupLink)

      // Fill signup form
      await waitFor(() => screen.getByText(/create your account/i))

      const emailInput = screen.getByPlaceholderText(/you@university\.edu/i)
      const passwordInput = screen.getByPlaceholderText(/create a secure password/i)

      await userEvent.type(emailInput, 'newuser@university.edu')
      await userEvent.type(passwordInput, 'Password123!')

      // Submit form
      const signupButton = screen.getByRole('button', { name: /sign up/i })
      await userEvent.click(signupButton)

      // Should redirect to onboarding
      await waitFor(
        () => {
          expect(screen.queryByText(/what.*your name/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('should complete onboarding and redirect to dashboard', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            ...mockSession,
            user: mockUserWithoutOnboarding,
          },
        },
        error: null,
      })

      supabase.auth.updateUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      render(<App />)

      // Should be on onboarding
      await waitFor(() => {
        expect(screen.getByText(/what.*your name/i)).toBeInTheDocument()
      })

      // Fill onboarding form
      const firstNameInput = screen.getByPlaceholderText(/first name/i)
      const lastNameInput = screen.getByPlaceholderText(/last name/i)

      await userEvent.type(firstNameInput, 'John')
      await userEvent.type(lastNameInput, 'Doe')

      // Submit onboarding
      const continueButton = screen.getByRole('button', { name: /continue/i })
      await userEvent.click(continueButton)

      await waitFor(() => {
        expect(supabase.auth.updateUser).toHaveBeenCalledWith({
          data: {
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
          },
        })
      })
    })

    it('should reject non-.edu email during signup', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.signUp.mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Only .edu email addresses are allowed'),
      })

      render(<App />)

      // Navigate to signup
      await waitFor(() => screen.getByText(/welcome back/i))
      const signupLink = screen.getByText(/create account/i)
      await userEvent.click(signupLink)

      // Fill with non-.edu email
      await waitFor(() => screen.getByText(/create your account/i))

      const emailInput = screen.getByPlaceholderText(/you@university\.edu/i)
      const passwordInput = screen.getByPlaceholderText(/create a secure password/i)

      await userEvent.type(emailInput, 'user@gmail.com')
      await userEvent.type(passwordInput, 'Password123!')

      // Submit form
      const signupButton = screen.getByRole('button', { name: /sign up/i })
      await userEvent.click(signupButton)

      // Should show error
      await waitFor(() => {
        expect(screen.getByText(/only \.edu email/i)).toBeInTheDocument()
      })
    })
  })

  describe('Login → Dashboard Flow', () => {
    it('should login and redirect completed user to dashboard', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: mockUser,
          session: mockSession,
        },
        error: null,
      })

      render(<App />)

      await waitFor(() => screen.getByText(/welcome back/i))

      // Fill login form
      const emailInput = screen.getByPlaceholderText(/you@university\.edu/i)
      const passwordInput = screen.getByPlaceholderText(/enter your password/i)

      await userEvent.type(emailInput, 'test@university.edu')
      await userEvent.type(passwordInput, 'Password123!')

      // Submit
      const loginButton = screen.getByRole('button', { name: /sign in/i })
      await userEvent.click(loginButton)

      await waitFor(() => {
        expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@university.edu',
          password: 'Password123!',
        })
      })
    })

    it('should show error on invalid credentials', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Invalid credentials'),
      })

      render(<App />)

      await waitFor(() => screen.getByText(/welcome back/i))

      const emailInput = screen.getByPlaceholderText(/you@university\.edu/i)
      const passwordInput = screen.getByPlaceholderText(/enter your password/i)

      await userEvent.type(emailInput, 'wrong@university.edu')
      await userEvent.type(passwordInput, 'WrongPassword')

      const loginButton = screen.getByRole('button', { name: /sign in/i })
      await userEvent.click(loginButton)

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
      })
    })
  })

  describe('Protected Route Access Control', () => {
    it('should block unauthenticated access to dashboard', async () => {
      render(<App />)

      await waitFor(() => {
        // Should be on login, not dashboard
        expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
        expect(screen.queryByText(/welcome back, john/i)).not.toBeInTheDocument()
      })
    })

    it('should redirect incomplete user to onboarding', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            ...mockSession,
            user: mockUserWithoutOnboarding,
          },
        },
        error: null,
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/what.*your name/i)).toBeInTheDocument()
        expect(screen.queryByText(/welcome back, /i)).not.toBeInTheDocument()
      })
    })

    it('should allow completed user to access dashboard', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back, john/i)).toBeInTheDocument()
      })
    })
  })

  describe('Logout Flow', () => {
    it('should logout user and redirect to login', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })

      supabase.auth.signOut.mockResolvedValue({ error: null })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back, john/i)).toBeInTheDocument()
      })

      // Find and click logout button
      const logoutButton = screen.getByTitle(/logout/i)
      await userEvent.click(logoutButton)

      await waitFor(() => {
        expect(supabase.auth.signOut).toHaveBeenCalled()
      })
    })
  })

  describe('Session Persistence', () => {
    it('should restore session on page load', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back, john/i)).toBeInTheDocument()
      })

      expect(supabase.auth.getSession).toHaveBeenCalled()
    })

    it('should handle session error and redirect to login', async () => {
      const { supabase } = require('../../lib/supabase')

      supabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: new Error('Invalid JWT'),
      })

      supabase.auth.signOut.mockResolvedValue({ error: null })

      render(<App />)

      await waitFor(() => {
        expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
        expect(supabase.auth.signOut).toHaveBeenCalled()
      })
    })
  })
})
