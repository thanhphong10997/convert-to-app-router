// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import BlankLayout from 'src/views/layouts/BlankLayout'
import ForgotPasswordPage from 'src/views/layouts/pages/forgot-password'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard={true} getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      {' '}
      <ForgotPasswordPage />
    </AuthLayoutWrapper>
  )
}

export default Index
