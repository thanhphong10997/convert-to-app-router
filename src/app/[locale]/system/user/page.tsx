// Next
import { NextPage } from 'next'

// config
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import UserListPage from 'src/views/layouts/pages/system/user/UserList'

// pages

type TProps = {}

export const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.SYSTEM.USER.VIEW]}>
      <UserListPage />
    </AuthLayoutWrapper>
  )
}

export default Index
