import React, { ReactNode } from 'react'
import FallbackSpinner from 'src/components/fall-back'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import BlankLayout from 'src/views/layouts/BlankLayout'

const Index = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <FallbackSpinner />
    </AuthLayoutWrapper>
  )
}

export default Index
