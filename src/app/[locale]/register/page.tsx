// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/layouts/pages/register'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard={true} getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <RegisterPage />
    </AuthLayoutWrapper>
  )
}

export default Register
