// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/layouts/pages/login'

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard={true} getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <LoginPage />
    </AuthLayoutWrapper>
  )
}

export default Index
