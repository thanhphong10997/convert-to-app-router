// Next
import { NextPage } from 'next'

// config
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// pages
import ProductTypeListPage from 'src/views/layouts/pages/manage-product/product-type/ProductTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ProductTypeListPage />
    </AuthLayoutWrapper>
  )
}

export default Index
