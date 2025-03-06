// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import { LayoutNotApp } from 'src/views/layouts/LayoutNotApp'
import MyDetailsOrderPage from 'src/views/layouts/pages/my-order/DetailsOrder'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyDetailsOrderPage />
    </AuthLayoutWrapper>
  )
}

export default Index
