// Next
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import PaymentTypeListPage from 'src/views/layouts/pages/settings/payment-type/PaymentTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <PaymentTypeListPage />
    </AuthLayoutWrapper>
  )
}

// Index.permission = [PERMISSIONS.SETTING.PAYMENT_TYPE.VIEW]
export default Index
