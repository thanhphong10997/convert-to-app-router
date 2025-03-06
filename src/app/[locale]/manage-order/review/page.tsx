// Next
import { NextPage } from 'next'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import ReviewListPage from 'src/views/layouts/pages/manage-order/reviews/ReviewList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ReviewListPage />
    </AuthLayoutWrapper>
  )
}

export default Index
