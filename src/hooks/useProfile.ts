import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { User } from '../types'

export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    if (!user) {
      console.log('[useProfile] No user, skipping fetch')
      setProfile(null)
      setLoading(false)
      return
    }

    console.log('[useProfile] Fetching profile for user:', user.id)
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('Student')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    console.log('[useProfile] Result:', { data, error: fetchError })

    if (fetchError) {
      setError(fetchError.message)
      setProfile(null)
    } else {
      setProfile(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  return { profile, loading, error, refetch: fetchProfile }
}