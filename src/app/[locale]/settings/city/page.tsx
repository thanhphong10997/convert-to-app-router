// Next
import { NextPage } from 'next'

// configs
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// page
import CityListPage from 'src/views/layouts/pages/settings/city/CityList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <CityListPage />
    </AuthLayoutWrapper>
  )
}

// Index.permission = [PERMISSIONS.SETTING.CITY.VIEW]
export default Index
