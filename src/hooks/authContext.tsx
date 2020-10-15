import React, { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContextData, AuthProviderProps } from '../config/interfaces'

import Server from '../services/_server'
import userService from '../services/userService'

import Loading from '../components/loading'

/**
 * Create a context to control Auth shared data
 */
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  userLogged
}) => {
  /**
   * Initialize properties model controlled by AuthProvider
   */
  const router = useRouter()
  const [user, setUser] = useState(userLogged)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  /**
   * Function to load user data by token and redirect to anothe page
   */
  const loadUserByTokenAndRedirect = async token => {
    if (token) {
      Server.setAuthCookie(token)

      if (token && !user) {
        const { data: user } = await userService.me()
        if (user) setUser(user)
      }

      router.push('/dashboard')
    }
  }

  /**
   * Function to sign user by payload form (email, password)
   *
   * @param payload user data from form to sign
   */
  const signIn = async payload => {
    const { token, status } = await userService.signIn(payload)
    loadUserByTokenAndRedirect(token)

    return status
  }

  /**
   * Function to create a new user
   *
   * @param payload user data from form to create user
   */
  const signUp = async payload => {
    const { token, status } = await userService.signUp(payload)
    loadUserByTokenAndRedirect(token)

    return status
  }

  /**
   * Logout function
   */
  const signOut = () => {
    router.replace('/')
    Server.removeAuthCookie()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signIn,
        signUp,
        signOut,
        loading,
        setUser
      }}
    >
      <Loading visible={loading} />
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use AuthContext
 */
function useAuth(): AuthContextData {
  return useContext(AuthContext)
}

/**
 * Hook to check components that need authentication to access
 *
 * @param Component React component to check authentication
 */
function ProtectRoute(Component: React.FC): React.FC {
  const ProtectComponent: React.FC = () => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) router.push('/login')
    }, [isAuthenticated])

    return <Component />
  }

  return ProtectComponent
}

/**
 * Export modules
 */
export { AuthProvider, useAuth, ProtectRoute }
