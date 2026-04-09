import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { User as UserProfile } from '../types'
import { getProfile, createProfile, updateProfile } from '../services/userServices.ts'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  profile: UserProfile | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, institution: string, major: string) => Promise<void>
  signOut: () => Promise<void>
  // START: Feature - Institution and Major Selection
  loadProfile: () => Promise<void>
  updateProf: (updates: Partial<UserProfile>) => Promise<void>
  // END: Feature - Institution and Major Selection
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async () => {
    if (user?.email) {
      try {
        const profile = await getProfile(user.email)
        setProfile(profile)
      } catch (error) {
        console.error('Failed to load profile:', error)
      }
    }
  }

  const updateProf = async (updates: Partial<UserProfile>) => {
    if (user?.email && profile) {
      try {
        const updated = await updateProfile(user.email, updates)
        if (updated) {
          setProfile(updated)
        }
      } catch (error) {
        console.error('Failed to update profile:', error)
        throw error // Re-throw so UI can handle it
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await loadProfile()
  }

  const signUp = async (email: string, password: string, institution: string, major: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    try {
      const newProfile = await createProfile({ email, name: email.split('@')[0], institution, major })
      setProfile(newProfile)
    } catch (error) {
      console.error('Failed to create profile:', error)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, profile, signIn, signUp, signOut, loadProfile, updateProf }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
