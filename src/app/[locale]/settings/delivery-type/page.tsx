// Next
import { NextPage } from 'next'

// config
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// layouts
import DeliveryTypeListPage from 'src/views/layouts/pages/settings/delivery-type/DeliveryTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <DeliveryTypeListPage />
    </AuthLayoutWrapper>
  )
}

// Index.permission = [PERMISSIONS.SETTING.DELIVERY_TYPE.VIEW]
export default Index
