// Next
import { NextPage } from 'next'

// configs
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// pages
import ProductListPage from 'src/views/layouts/pages/manage-product/product/ProductList'

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]}>
      <ProductListPage />
    </AuthLayoutWrapper>
  )
}

export default Index
