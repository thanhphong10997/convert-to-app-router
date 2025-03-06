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
import i18nConfig from 'src/app/i18nConfig'
import { useTranslation } from 'react-i18next'

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
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const permissionUser = auth?.user?.role?.permissions
    ? auth?.user?.role?.permissions.includes(PERMISSIONS.BASIC)
      ? [PERMISSIONS.DASHBOARD]
      : auth?.user?.role?.permissions
    : []
  useEffect(() => {
    // redirect the router to the home page because every page including auth-guard or guest-guard will goes through here
    const url = currentLang === i18nConfig.defaultLocale ? '/' : `/${currentLang}`
    if (pathName === url) {
      router.push(ROUTE_CONFIG.HOME)
    }
  }, [pathName])

  let ability: AppAbility
  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, permission)
  }

  const url500 = currentLang === i18nConfig.defaultLocale ? '/500' : `/${currentLang}/500`
  const url404 = currentLang === i18nConfig.defaultLocale ? '/404' : `/${currentLang}/404`

  // if guest guard or no guard or error pages
  if (guestGuard || pathName === url500 || pathName === url404 || !authGuard) {
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
