// Next
import { NextPage } from 'next'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// views
import { LayoutNotApp } from 'src/views/layouts/LayoutNotApp'
import MyProfilePage from 'src/views/layouts/pages/my-profile'

type TProps = {}

const Profile: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyProfilePage />
    </AuthLayoutWrapper>
  )
}

export default Profile
