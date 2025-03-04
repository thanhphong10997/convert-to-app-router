// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import { LayoutNotApp } from 'src/views/layouts/LayoutNotApp'
import MyOrderPage from 'src/views/layouts/pages/my-order'

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyOrderPage />
    </AuthLayoutWrapper>
  )
}

export default Index
