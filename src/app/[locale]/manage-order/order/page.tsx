// Next
import { NextPage } from 'next'

// others
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import OrderProductListPage from 'src/views/layouts/pages/manage-order/order-product/OrderProductList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]}>
      <OrderProductListPage />
    </AuthLayoutWrapper>
  )
}
export default Index
