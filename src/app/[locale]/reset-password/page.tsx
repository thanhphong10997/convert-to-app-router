// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import BlankLayout from 'src/views/layouts/BlankLayout'
import ResetPasswordPage from 'src/views/layouts/pages/reset-password'

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard={true} getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <ResetPasswordPage />
    </AuthLayoutWrapper>
  )
}

export default Index
