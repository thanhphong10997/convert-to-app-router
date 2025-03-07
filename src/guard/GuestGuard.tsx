'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()
  const pathName = usePathname()
  const authContext = useAuth()

  useEffect(() => {
    // Handle if the first render of the page is not ready yet

    if (window.localStorage.getItem(USER_DATA) && window.localStorage.getItem(ACCESS_TOKEN)) {
      router.replace('/')
    }
  }, [pathName])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
