// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import BlankLayout from 'src/views/layouts/BlankLayout'

// views
import PaymentVNPay from 'src/views/layouts/pages/payment/vnpay'

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <PaymentVNPay />
    </AuthLayoutWrapper>
  )
}

export default Index
