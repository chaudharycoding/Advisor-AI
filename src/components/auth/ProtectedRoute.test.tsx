import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import type { User } from '@supabase/supabase-js'

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

describe('ProtectedRoute', () => {
  const mockUseAuth = () => require('../../contexts/AuthContext').useAuth

  const mockUser: Partial<User> = {
    id: '123',
    email: 'test@university.edu',
    user_metadata: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
    },
  }

  const mockUserWithoutOnboarding: Partial<User> = {
    id: '456',
    email: 'newuser@university.edu',
    user_metadata: {},
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show loading state when auth is loading', () => {
    mockUseAuth().mockReturnValue({
      user: null,
      loading: true,
      session: null,
    })

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should redirect to login when user is not authenticated', () => {
    mockUseAuth().mockReturnValue({
      user: null,
      loading: false,
      session: null,
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('should redirect to onboarding when user has not completed onboarding', () => {
    mockUseAuth().mockReturnValue({
      user: mockUserWithoutOnboarding,
      loading: false,
      session: { user: mockUserWithoutOnboarding },
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/onboarding" element={<div>Onboarding Page</div>} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Onboarding Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('should render protected content when user is authenticated and onboarded', () => {
    mockUseAuth().mockReturnValue({
      user: mockUser,
      loading: false,
      session: { user: mockUser },
    })

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should allow access to onboarding page with requireOnboarding=false', () => {
    mockUseAuth().mockReturnValue({
      user: mockUserWithoutOnboarding,
      loading: false,
      session: { user: mockUserWithoutOnboarding },
    })

    render(
      <BrowserRouter>
        <ProtectedRoute requireOnboarding={false}>
          <div>Onboarding Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Onboarding Content')).toBeInTheDocument()
  })

  it('should not redirect to onboarding when already on onboarding page', () => {
    mockUseAuth().mockReturnValue({
      user: mockUserWithoutOnboarding,
      loading: false,
      session: { user: mockUserWithoutOnboarding },
    })

    // Render with initial location as /onboarding
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <div>Onboarding Page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )

    // Should not infinitely redirect
    expect(screen.getByText('Onboarding Page')).toBeInTheDocument()
  })

  it('should render content when user has completed onboarding (has firstName)', () => {
    const userWithFirstName = {
      ...mockUser,
      user_metadata: {
        firstName: 'Jane',
        // lastName might not be set yet
      },
    }

    mockUseAuth().mockReturnValue({
      user: userWithFirstName,
      loading: false,
      session: { user: userWithFirstName },
    })

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Dashboard Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
  })

  it('should redirect when user metadata exists but firstName is missing', () => {
    const userWithoutFirstName = {
      id: '789',
      email: 'another@university.edu',
      user_metadata: {
        lastName: 'Smith', // has metadata but no firstName
      },
    }

    mockUseAuth().mockReturnValue({
      user: userWithoutFirstName,
      loading: false,
      session: { user: userWithoutFirstName },
    })

    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/onboarding" element={<div>Onboarding Page</div>} />
        </Routes>
      </BrowserRouter>
    )

    expect(screen.getByText('Onboarding Page')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
