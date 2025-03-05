import { ReactNode } from 'react'
import AuthGuard from './AuthGuard'
import GuestGuard from './GuestGuard'
import NoGuard from './NoGuard'

type GuardProps = {
  authGuard?: boolean
  guestGuard?: boolean
  children: ReactNode
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<span />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <NoGuard fallBack={<span />}>{children}</NoGuard>
  } else {
    return <AuthGuard fallback={<span />}>{children}</AuthGuard>
  }
}

export default Guard
