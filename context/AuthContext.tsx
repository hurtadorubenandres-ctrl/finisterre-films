'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import axios from 'axios'
import type { IUserSafe, LoginCredentials, RegisterData } from '@/lib/types'

// ──────────────────────────────────────────────────────────
// Context value type
// ──────────────────────────────────────────────────────────
interface AuthContextValue {
  user: IUserSafe | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// ──────────────────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUserSafe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario al montar (desde cookie/token)
  const refreshUser = useCallback(async () => {
    try {
      const { data } = await axios.get<{ success: boolean; data: IUserSafe }>(
        '/api/auth/me'
      )
      if (data.success) {
        setUser(data.data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post<{ success: boolean; data: IUserSafe }>(
        '/api/auth/login',
        credentials,
        { withCredentials: true }
      )
      if (data.success) {
        setUser(data.data)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (registerData: RegisterData) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post<{ success: boolean; data: IUserSafe }>(
        '/api/auth/register',
        registerData,
        { withCredentials: true }
      )
      if (data.success) {
        setUser(data.data)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true })
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ──────────────────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}

export default AuthContext
