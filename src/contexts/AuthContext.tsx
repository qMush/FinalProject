import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

type User = {
  name: string
  companiesUsed: number
  companiesLimit: number
}

type AuthContextValue = {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (token: string, user?: Partial<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'scan_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { token: string; user: User }
        setToken(parsed.token)
        setUser(parsed.user)
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const persist = useCallback((nextToken: string | null, nextUser: User | null) => {
    if (nextToken && nextUser) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ token: nextToken, user: nextUser }),
      )
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(
    (nextToken: string, partialUser?: Partial<User>) => {
      const baseUser: User = {
        name: partialUser?.name ?? 'Иван Иванов',
        companiesUsed: partialUser?.companiesUsed ?? 34,
        companiesLimit: partialUser?.companiesLimit ?? 1000,
      }
      setToken(nextToken)
      setUser(baseUser)
      persist(nextToken, baseUser)
    },
    [persist],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    persist(null, null)
  }, [persist])

  const value: AuthContextValue = {
    isAuthenticated: Boolean(token),
    token,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}


