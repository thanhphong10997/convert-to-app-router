'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Types
import { buildAbilityFor, ACLObj, AppAbility } from 'src/configs/acl'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/views/layouts/pages/not-authorized'
import { useAuth } from 'src/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { AbilityContext } from 'src/components/acl/Can'
import { PERMISSIONS } from 'src/configs/permission'
import { ROUTE_CONFIG } from 'src/configs/route'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
  permission?: string[]
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true, permission } = props
  const auth = useAuth()
  const router = useRouter()
  const pathName = usePathname()

  const permissionUser = auth?.user?.role?.permissions
    ? auth?.user?.role?.permissions.includes(PERMISSIONS.BASIC)
      ? [PERMISSIONS.DASHBOARD]
      : auth?.user?.role?.permissions
    : []
  useEffect(() => {
    // redirect the router to the home page because every page including auth-guard or guest-guard will goes through here
    if (pathName === '/' || pathName === 'en/') {
      router.push(ROUTE_CONFIG.HOME)
    }
  }, [pathName])

  let ability: AppAbility
  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, permission)
  }

  // if guest guard or no guard or error pages
  if (
    guestGuard ||
    pathName === '/500' ||
    pathName === 'en/500' ||
    pathName === '/404' ||
    pathName === 'en/404' ||
    !authGuard
  ) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  // check the access of current user
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )

  // return <>{children}</>
}

export default AclGuard
