'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, ReactElement, useEffect } from 'react'
import { API_ENDPOINT } from 'src/configs/api'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { ROUTE_CONFIG } from 'src/configs/route'
import {
  clearLocalRememberLoginAuthSocial,
  clearLocalUserData,
  clearTemporaryToken,
  getTemporaryToken
} from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'
import { createUrlQuery } from 'src/utils'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()
  const pathName = usePathname()
  const authContext = useAuth()
  const { temporaryToken } = getTemporaryToken()

  useEffect(() => {
    // Handle if the first render of the page is not ready yet

    if (
      authContext.user === null &&
      !window.localStorage.getItem(USER_DATA) &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !temporaryToken
    ) {
      if (pathName !== '/' && pathName !== 'en/' && pathName !== '/login' && pathName !== 'en/login') {
        // return the nearest page after login
        router.replace(`${ROUTE_CONFIG.LOGIN}?${createUrlQuery('returnUrl', pathName)}`)
      } else {
        router.replace(`/login`)
      }
      authContext.setUser(null)

      // Clear local storage before login
      clearLocalUserData()
    }
  }, [pathName])

  useEffect(() => {
    // remove temporary token when reloading page
    const handleUnload = () => {
      clearTemporaryToken()

      // clearLocalRememberLoginAuthSocial()
    }
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  if (authContext.loading || authContext.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
