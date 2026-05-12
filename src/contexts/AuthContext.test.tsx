import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      updateUser: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

describe('AuthContext', () => {
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

  const mockSession = {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    user: mockUser,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize with loading state', () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      expect(result.current.loading).toBe(true)
    })

    it('should set user and session on successful session retrieval', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      expect(result.current.user).toEqual(mockUser)
      expect(result.current.session).toEqual(mockSession)
    })

    it('should handle session error and sign out', async () => {
      const { supabase } = require('../lib/supabase')
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      supabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: new Error('Invalid JWT'),
      })
      supabase.auth.signOut.mockResolvedValue({ error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(supabase.auth.signOut).toHaveBeenCalled()
      expect(result.current.user).toBeNull()
      expect(result.current.session).toBeNull()

      consoleErrorSpy.mockRestore()
    })
  })

  describe('signIn', () => {
    it('should successfully sign in with valid credentials', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await result.current.signIn('test@university.edu', 'password123')

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@university.edu',
        password: 'password123',
      })
    })

    it('should throw error on invalid credentials', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Invalid credentials'),
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await expect(result.current.signIn('wrong@email.com', 'wrong')).rejects.toThrow(
        'Invalid credentials'
      )
    })
  })

  describe('signUp', () => {
    it('should successfully sign up with .edu email', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await result.current.signUp('newuser@university.edu', 'password123')

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'newuser@university.edu',
        password: 'password123',
      })
    })

    it('should throw error for non-.edu email', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signUp.mockResolvedValue({
        data: { user: null, session: null },
        error: new Error('Only .edu email addresses are allowed'),
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await expect(result.current.signUp('user@gmail.com', 'password')).rejects.toThrow(
        'Only .edu email addresses are allowed'
      )
    })
  })

  describe('updateUserProfile', () => {
    it('should successfully update user profile metadata', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.updateUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await result.current.updateUserProfile({ firstName: 'Jane', lastName: 'Smith' })

      expect(supabase.auth.updateUser).toHaveBeenCalledWith({
        data: {
          firstName: 'Jane',
          lastName: 'Smith',
          fullName: 'Jane Smith',
        },
      })
    })

    it('should sign out on JWT error', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.updateUser.mockResolvedValue({
        data: { user: null },
        error: new Error('Invalid JWT token'),
      })
      supabase.auth.signOut.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await expect(
        result.current.updateUserProfile({ firstName: 'Test', lastName: 'User' })
      ).rejects.toThrow('Invalid JWT token')

      expect(supabase.auth.signOut).toHaveBeenCalled()
    })
  })

  describe('signOut', () => {
    it('should successfully sign out user', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signOut.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await result.current.signOut()

      expect(supabase.auth.signOut).toHaveBeenCalled()
    })

    it('should throw error on sign out failure', async () => {
      const { supabase } = require('../lib/supabase')
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      })
      supabase.auth.signOut.mockResolvedValue({
        error: new Error('Sign out failed'),
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      await expect(result.current.signOut()).rejects.toThrow('Sign out failed')
    })
  })

  describe('Auth state changes', () => {
    it('should handle SIGNED_OUT event', async () => {
      const { supabase } = require('../lib/supabase')
      let authCallback: any

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockImplementation((callback) => {
        authCallback = callback
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      // Trigger SIGNED_OUT event
      authCallback('SIGNED_OUT', null)

      await waitFor(() => {
        expect(result.current.user).toBeNull()
        expect(result.current.session).toBeNull()
      })
    })

    it('should handle failed token refresh', async () => {
      const { supabase } = require('../lib/supabase')
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      let authCallback: any

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      })
      supabase.auth.onAuthStateChange.mockImplementation((callback) => {
        authCallback = callback
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      })
      supabase.auth.signOut.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      })

      await waitFor(() => expect(result.current.loading).toBe(false))

      // Trigger TOKEN_REFRESHED event with null session
      authCallback('TOKEN_REFRESHED', null)

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith('Token refresh failed, signing out')
        expect(supabase.auth.signOut).toHaveBeenCalled()
      })

      consoleWarnSpy.mockRestore()
    })
  })
})
