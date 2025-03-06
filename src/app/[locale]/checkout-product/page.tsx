// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import { LayoutNotApp } from 'src/views/layouts/LayoutNotApp'
import CheckoutProductPage from 'src/views/layouts/pages/checkout-product'

type TProps = {}

const Profile: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <CheckoutProductPage />
    </AuthLayoutWrapper>
  )
}
export default Profile
